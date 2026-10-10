"use client";
import { useEffect, useRef } from "react";

/**
 * ServicesOrb — PowerPoint Morph Transition:
 *
 * When scrolling from Hero to What We Do (Services):
 * The molecules smoothly and organically MORPH from the central Hero Circle (Torus ring)
 * into the iconic Infinity (∞) on the left and the W-shape connector streams.
 *
 * 100% fluid, 60fps cubic eased particle trajectories with individual staggering
 * and 3D stream arcs.
 */
export default function ServicesOrb({ cardPositions = [] }) {
  const mountRef = useRef(null);
  const cardPosRef = useRef(cardPositions);

  useEffect(() => {
    cardPosRef.current = cardPositions;
  }, [cardPositions]);

  useEffect(() => {
    if (!mountRef.current) return;

    let isDisposed = false;
    let THREE, renderer, scene, camera;
    let infinityParticles, lineParticles;
    let infinityGeo, lineGeo, infinityMat, lineMat;
    let raf;
    let W = mountRef.current.clientWidth || 1200;
    let H = mountRef.current.clientHeight || 750;

    // Morph progress: 0.0 = Hero Circle, 1.0 = Services Infinity & W stream
    let currentMorph = 0;
    let targetMorph = 0;

    // Organic turbulence noise — EXACT match with HeroOrb
    function turbulence(u, v, t) {
      return (
        Math.sin(u * 6 + t * 1.2) * Math.sin(v * 3 - t * 0.8) * 0.35 +
        Math.cos(u * 12 - t * 1.5) * Math.sin(v * 6 + t * 1.1) * 0.15 +
        Math.sin(u * 4 + t * 0.5) * Math.cos(v * 2 - t * 0.4) * 0.20
      );
    }

    // Cubic Bézier interpolation for smooth S-curves between cards
    function getBezierPoint(p0, p1, p2, p3, t) {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;

      return {
        x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
        y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
        z: 0,
      };
    }

    const init = async () => {
      THREE = await import("three");
      if (isDisposed || !mountRef.current) return;

      scene = new THREE.Scene();

      // Perspective camera matching HeroOrb (FOV 52, z = 3.8)
      camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 100);
      camera.position.z = 3.8;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      // Clear any previous canvas and append single clean canvas
      mountRef.current.innerHTML = "";
      mountRef.current.appendChild(renderer.domElement);

      // Pure brand palette — EXACT match with HeroOrb
      const cGreen = new THREE.Color("#16A34A"); // brand-600
      const cLime = new THREE.Color("#86EFAC"); // brand-300
      const cTeal = new THREE.Color("#22C55E"); // brand-500
      const cDeep = new THREE.Color("#064E3B"); // brand-900

      // Round soft glow dot sprite — EXACT match with HeroOrb
      const dotCanvas = document.createElement("canvas");
      dotCanvas.width = dotCanvas.height = 128;
      const dc = dotCanvas.getContext("2d");

      const grad = dc.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.25, "rgba(255, 255, 255, 0.7)");
      grad.addColorStop(0.65, "rgba(255, 255, 255, 0.15)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");

      dc.fillStyle = grad;
      dc.fillRect(0, 0, 128, 128);

      const dotTexture = new THREE.CanvasTexture(dotCanvas);
      dotTexture.needsUpdate = true;

      // ─────────────────────────────────────────────────────────────
      // 1. MORPHING INFINITY PARTICLES (Hero Circle -> Infinity)
      // ─────────────────────────────────────────────────────────────
      const INF_RING_PARTICLES = 7200;
      const INF_SPRAY_PARTICLES = 1800;
      const INF_TOTAL = INF_RING_PARTICLES + INF_SPRAY_PARTICLES;

      const iPos = new Float32Array(INF_TOTAL * 3);
      const iCol = new Float32Array(INF_TOTAL * 3);
      const iMeta = new Float32Array(INF_TOTAL * 4); // u, v, tubeT, isSpray

      for (let i = 0; i < INF_TOTAL; i++) {
        const isSpray = i >= INF_RING_PARTICLES ? 1 : 0;
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const tubeT = isSpray
          ? 0.65 + Math.random() * 0.75
          : Math.random();

        iMeta[i * 4] = u;
        iMeta[i * 4 + 1] = v;
        iMeta[i * 4 + 2] = tubeT;
        iMeta[i * 4 + 3] = isSpray;

        // Color logic matching HeroOrb
        const angleT = Math.sin(u) * 0.5 + 0.5;
        let c;
        if (isSpray) {
          c = cLime.clone().lerp(cTeal, Math.random());
        } else if (angleT < 0.33) {
          c = cDeep.clone().lerp(cGreen, tubeT);
        } else if (angleT < 0.66) {
          c = cGreen.clone().lerp(cLime, (angleT - 0.33) * 3);
        } else {
          c = cLime.clone().lerp(cTeal, (angleT - 0.66) * 3);
        }

        if (isSpray) c.multiplyScalar(1.4);

        iCol[i * 3] = c.r;
        iCol[i * 3 + 1] = c.g;
        iCol[i * 3 + 2] = c.b;

        iPos[i * 3] = 0;
        iPos[i * 3 + 1] = 0;
        iPos[i * 3 + 2] = 0;
      }

      infinityGeo = new THREE.BufferGeometry();
      infinityGeo.setAttribute("position", new THREE.BufferAttribute(iPos, 3));
      infinityGeo.setAttribute("color", new THREE.BufferAttribute(iCol, 3));
      infinityGeo.userData.metadata = iMeta;

      infinityMat = new THREE.PointsMaterial({
        size: 0.038,
        vertexColors: true,
        map: dotTexture,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        opacity: 0.75,
      });

      infinityParticles = new THREE.Points(infinityGeo, infinityMat);
      scene.add(infinityParticles);

      // ─────────────────────────────────────────────────────────────
      // 2. MORPHING W-SHAPE CONNECTOR STREAM
      // ─────────────────────────────────────────────────────────────
      const LINE_TOTAL = 2600;
      const lPos = new Float32Array(LINE_TOTAL * 3);
      const lCol = new Float32Array(LINE_TOTAL * 3);
      const lMeta = new Float32Array(LINE_TOTAL * 4); // segIdx, tRaw, radialDist, angle

      for (let i = 0; i < LINE_TOTAL; i++) {
        const segIdx = i % 6;
        const tRaw = Math.random();
        const radialDist = Math.random() * 0.12;
        const angle = Math.random() * Math.PI * 2;

        lMeta[i * 4] = segIdx;
        lMeta[i * 4 + 1] = tRaw;
        lMeta[i * 4 + 2] = radialDist;
        lMeta[i * 4 + 3] = angle;

        const randVal = Math.random();
        let c;
        if (randVal < 0.30) {
          c = cDeep.clone().lerp(cGreen, Math.random());
        } else if (randVal < 0.70) {
          c = cGreen.clone().lerp(cTeal, Math.random());
        } else {
          c = cTeal.clone().lerp(cLime, Math.random());
        }

        lCol[i * 3] = c.r;
        lCol[i * 3 + 1] = c.g;
        lCol[i * 3 + 2] = c.b;

        lPos[i * 3] = 0;
        lPos[i * 3 + 1] = 0;
        lPos[i * 3 + 2] = 0;
      }

      lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));
      lineGeo.setAttribute("color", new THREE.BufferAttribute(lCol, 3));
      lineGeo.userData.metadata = lMeta;

      lineMat = new THREE.PointsMaterial({
        size: 0.033,
        vertexColors: true,
        map: dotTexture,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        opacity: 0.72,
      });

      lineParticles = new THREE.Points(lineGeo, lineMat);
      scene.add(lineParticles);

      // Check initial scroll position immediately
      const sectionEl = document.getElementById("services");
      if (sectionEl) {
        const rect = sectionEl.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.top < vh * 0.40) {
          currentMorph = 1.0;
          targetMorph = 1.0;
        }
      }

      animate();
    };

    const startTime = Date.now();

    const animate = () => {
      if (isDisposed) return;
      raf = requestAnimationFrame(animate);
      const t = (Date.now() - startTime) / 1000;

      // ── Calculate Scroll-based Morph Target ──────────────────
      const sectionEl = document.getElementById("services");
      if (sectionEl) {
        const rect = sectionEl.getBoundingClientRect();
        const vh = window.innerHeight;
        // As services enters the viewport (from top at 85% vh to 15% vh):
        const startY = vh * 0.85;
        const endY = vh * 0.15;
        const p = (startY - rect.top) / (startY - endY);
        targetMorph = Math.max(0, Math.min(1, p));
      }

      // Smooth 60fps spring-damping lerp for fluid morph transition
      currentMorph += (targetMorph - currentMorph) * 0.06;

      // Keep particles stationary at fixed size (no mouse tilt)
      if (infinityParticles) {
        infinityParticles.rotation.set(0, 0, 0);
      }

      // 3D frustum dimensions at z = 0
      const halfH = 3.8 * Math.tan((52 * Math.PI) / 360);
      const halfW = halfH * (W / H);

      const toWorld = (px, py) => ({
        x: ((px / W) * 2 - 1) * halfW,
        y: -((py / H) * 2 - 1) * halfH,
      });

      const cards = cardPosRef.current;
      const hasCards = cards && cards.length >= 6 && cards[0].x > 0;

      // Card 0 in 3D world space
      const c0World = hasCards
        ? toWorld(cards[0].x, cards[0].y)
        : { x: -halfW * 0.20, y: halfH * 0.25 };

      // ── Target Infinity Parameters ──────────────────────────
      const SCALE_X = 0.82; // half-width of infinity
      const SCALE_Y = 0.52; // lobe height scaling
      const R_TUBE = 0.15; // tube thickness with clear open loop centers

      // Position: clearly to the left of Landing Pages (Card 0)
      const minCenterX = -halfW + SCALE_X + R_TUBE + 0.18;
      const targetCenterX = c0World.x - (SCALE_X + R_TUBE + 1.15);
      const infCenterX = Math.max(minCenterX, Math.min(targetCenterX, c0World.x - 1.55));
      const infCenterY = c0World.y;

      // ── Hero Circle Parameters (EXACT match with HeroOrb) ───
      const HERO_R_MAJOR = 1.75;
      const HERO_R_TUBE = 0.38;

      // ── Animate Morphing Infinity Particles ─────────────────
      if (infinityGeo) {
        const pos = infinityGeo.attributes.position;
        const meta = infinityGeo.userData.metadata;
        const N = pos.count;

        for (let i = 0; i < N; i++) {
          const u = meta[i * 4];
          const v = meta[i * 4 + 1];
          const tubeT = meta[i * 4 + 2];
          const isSpray = meta[i * 4 + 3];

          // 1. Position on HERO CIRCLE (at center of screen)
          const rHero = HERO_R_MAJOR + HERO_R_TUBE * tubeT * Math.cos(v);
          const heroX = rHero * Math.cos(u);
          const heroY = rHero * Math.sin(u);
          const heroZ = HERO_R_TUBE * tubeT * Math.sin(v);

          // 2. Position on TARGET INFINITY (on the left)
          const noiseAmt = isSpray ? 0.60 : 0.32;
          const noise = turbulence(u, v, t) * noiseAmt;
          const effectiveTube = Math.max(0.12, tubeT + noise);

          const sinU = Math.sin(u);
          const cosU = Math.cos(u);
          const denom = 1 + 0.45 * sinU * sinU;
          const cx = (SCALE_X * cosU) / denom;
          const cy = (SCALE_Y * Math.sin(2 * u)) / denom;

          const du = 0.005;
          const sinU2 = Math.sin(u + du);
          const cosU2 = Math.cos(u + du);
          const denom2 = 1 + 0.45 * sinU2 * sinU2;
          const cx2 = (SCALE_X * cosU2) / denom2;
          const cy2 = (SCALE_Y * Math.sin(2 * (u + du))) / denom2;
          const tx = cx2 - cx;
          const ty = cy2 - cy;
          const tlen = Math.hypot(tx, ty) || 1;
          const nx = -ty / tlen;
          const ny = tx / tlen;

          const rInf = R_TUBE * effectiveTube;
          const cosV = Math.cos(v + t * 0.3);
          const sinV = Math.sin(v + t * 0.3);

          const infX = infCenterX + cx + nx * rInf * cosV;
          const infY = infCenterY + cy + ny * rInf * cosV;
          const infZ = rInf * sinV;

          // 3. MORPH TRANSITION:
          // Individual natural stagger delay based on particle angle
          const stagger = ((Math.sin(u) + 1) * 0.5) * 0.18;
          const localM = Math.max(0, Math.min(1, (currentMorph - stagger) / (1 - 0.18)));
          // Smooth cubic easing
          const easeM = localM < 0.5
            ? 4 * localM * localM * localM
            : 1 - Math.pow(-2 * localM + 2, 3) / 2;

          // 3D fluid stream arc during flight
          const arc = Math.sin(easeM * Math.PI);
          const arcX = -arc * 0.35 * Math.sin(u);
          const arcY = arc * 0.45 * Math.cos(u);
          const arcZ = arc * 0.60 * Math.sin(v);

          // Interpolated coordinate
          const px = (1 - easeM) * heroX + easeM * infX + arcX;
          const py = (1 - easeM) * heroY + easeM * infY + arcY;
          const pz = (1 - easeM) * heroZ + easeM * infZ + arcZ;

          pos.setXYZ(i, px, py, pz);
        }
        pos.needsUpdate = true;
      }

      // ── Animate Morphing Connector Stream ───────────────────
      if (lineGeo) {
        const pos = lineGeo.attributes.position;
        const meta = lineGeo.userData.metadata;
        const N = pos.count;

        if (!hasCards || currentMorph < 0.05) {
          // Hide connector line until morphing begins and cards are measured
          for (let i = 0; i < N; i++) {
            pos.setXYZ(i, 0, 0, -100);
          }
          pos.needsUpdate = true;
          lineMat.opacity = 0;
        } else {
          // Fade in line as morph progresses
          const lineFade = Math.max(0, Math.min(1, (currentMorph - 0.20) / 0.80));
          lineMat.opacity = 0.72 * lineFade;

          // Card radius in 3D world units (Card diameter is 270px -> radius 135px)
          const cardRadius = (135 / W) * 2 * halfW;

          const getPerimeterPoint = (center, target, radius) => {
            const dx = target.x - center.x;
            const dy = target.y - center.y;
            const dist = Math.hypot(dx, dy) || 1;
            return {
              x: center.x + (dx / dist) * radius,
              y: center.y + (dy / dist) * radius,
            };
          };

          const c0 = toWorld(cards[0].x, cards[0].y); // Landing Pages
          const c3 = toWorld(cards[3].x, cards[3].y); // Web Applications
          const c1 = toWorld(cards[1].x, cards[1].y); // Portfolio Websites
          const c4 = toWorld(cards[4].x, cards[4].y); // Mobile Apps
          const c2 = toWorld(cards[2].x, cards[2].y); // Business Websites
          const c5 = toWorld(cards[5].x, cards[5].y); // Hosting & Care

          // Right tip of Infinity
          const infRight = { x: infCenterX + SCALE_X * 0.98, y: infCenterY };

          // Purely Circle-to-Circle segments: ZERO particles enter any circle!
          const s0_start = infRight;
          const s0_end = getPerimeterPoint(c0, infRight, cardRadius);

          const s1_start = getPerimeterPoint(c0, c3, cardRadius);
          const s1_end = getPerimeterPoint(c3, c0, cardRadius);

          const s2_start = getPerimeterPoint(c3, c1, cardRadius);
          const s2_end = getPerimeterPoint(c1, c3, cardRadius);

          const s3_start = getPerimeterPoint(c1, c4, cardRadius);
          const s3_end = getPerimeterPoint(c4, c1, cardRadius);

          const s4_start = getPerimeterPoint(c4, c2, cardRadius);
          const s4_end = getPerimeterPoint(c2, c4, cardRadius);

          const s5_start = getPerimeterPoint(c2, c5, cardRadius);
          const s5_end = getPerimeterPoint(c5, c2, cardRadius);

          const segmentPairs = [
            [s0_start, s0_end],
            [s1_start, s1_end],
            [s2_start, s2_end],
            [s3_start, s3_end],
            [s4_start, s4_end],
            [s5_start, s5_end],
          ];

          const segments = [];
          for (let s = 0; s < 6; s++) {
            const [start, end] = segmentPairs[s];
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const cPoint1 = { x: start.x + dx * 0.40, y: start.y + dy * 0.10 };
            const cPoint2 = { x: start.x + dx * 0.60, y: end.y - dy * 0.10 };
            segments.push({ p0: start, p1: cPoint1, p2: cPoint2, p3: end });
          }

          for (let i = 0; i < N; i++) {
            const segIdx = Math.floor(meta[i * 4]);
            const tRaw = meta[i * 4 + 1];
            const radialDist = meta[i * 4 + 2];
            const angle = meta[i * 4 + 3];

            if (segIdx >= segments.length) continue;

            const flowSpeed = 0.15;
            const flowT = (tRaw + (t * flowSpeed) % 1) % 1;

            const seg = segments[segIdx];
            const pt = getBezierPoint(seg.p0, seg.p1, seg.p2, seg.p3, flowT);

            const wobble = Math.sin(flowT * Math.PI * 6 + t * 1.8 + angle) * 0.02;
            const r = radialDist + wobble;

            // Target path point
            const targetX = pt.x + r * Math.cos(angle);
            const targetY = pt.y + r * Math.sin(angle);
            const targetZ = r * Math.sin(angle * 2);

            // Origin on Hero Circle
            const uCircle = (segIdx / 6) * Math.PI * 2 + tRaw * (Math.PI / 3);
            const heroStartX = HERO_R_MAJOR * Math.cos(uCircle);
            const heroStartY = HERO_R_MAJOR * Math.sin(uCircle);

            // Morph to path
            const px = (1 - lineFade) * heroStartX + lineFade * targetX;
            const py = (1 - lineFade) * heroStartY + lineFade * targetY;
            const pz = targetZ;

            pos.setXYZ(i, px, py, pz);
          }
          pos.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    const onResize = () => {
      if (!renderer || !camera || !mountRef.current) return;
      W = mountRef.current.clientWidth || 1200;
      H = mountRef.current.clientHeight || 750;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };

    window.addEventListener("resize", onResize);
    init();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      infinityGeo?.dispose();
      lineGeo?.dispose();
      infinityMat?.dispose();
      lineMat?.dispose();
      renderer?.dispose();
      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
