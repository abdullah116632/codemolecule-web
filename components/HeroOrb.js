"use client";
import { useEffect, useRef } from "react";

/**
 * HeroOrb — A large torus ring made of thousands of particles.
 * The ring edge is turbulent / wavy like the getlayers.ai "new-era" template.
 * Brand colors: deep green → lime → teal.
 */
export default function HeroOrb() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let THREE, renderer, scene, camera, particles, geo, mat;
    let raf;
    let W = mountRef.current.clientWidth;
    let H = mountRef.current.clientHeight;
    const mouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };

    // --- Organic turbulence noise (sum of sin waves) ---
    // This creates the fluid, waving molecule effect on the stationary ring
    function turbulence(u, v, t) {
      return (
        Math.sin(u * 6  + t * 1.2) * Math.sin(v * 3  - t * 0.8) * 0.35 +
        Math.cos(u * 12 - t * 1.5) * Math.sin(v * 6  + t * 1.1) * 0.15 +
        Math.sin(u * 4  + t * 0.5) * Math.cos(v * 2  - t * 0.4) * 0.20
      );
    }

    const init = async () => {
      THREE = await import("three");

      scene    = new THREE.Scene();
      camera   = new THREE.PerspectiveCamera(52, W / H, 0.1, 100);
      camera.position.z = 3.8;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mountRef.current?.appendChild(renderer.domElement);

      // ── Particle counts & torus params ──────────────────
      const RING_PARTICLES  = 8000;  // particles on the main ring
      const SPRAY_PARTICLES = 2000;  // extra "spray" off the ring edge
      const TOTAL           = RING_PARTICLES + SPRAY_PARTICLES;

      const R_MAJOR = 1.75;   // torus major radius (increased to make circle bigger)
      const R_TUBE  = 0.38;   // torus tube radius

      const positions  = new Float32Array(TOTAL * 3);
      const colors     = new Float32Array(TOTAL * 3);
      const metadata   = new Float32Array(TOTAL * 4); // u, v, tubeT, isSpray

      // Pure brand palette (Dark Green → Green → Lime)
      const cGreen  = new THREE.Color("#16A34A"); // brand-600
      const cLime   = new THREE.Color("#86EFAC"); // brand-300
      const cTeal   = new THREE.Color("#22C55E"); // brand-500 (replaces teal)
      const cDeep   = new THREE.Color("#064E3B"); // brand-900

      for (let i = 0; i < TOTAL; i++) {
        const isSpray = i >= RING_PARTICLES ? 1 : 0;
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        // tubeT: 0 = inner tube wall, 1 = outer
        const tubeT = isSpray
          ? 0.6 + Math.random() * 0.7   // spray particles pushed outward
          : Math.random();

        metadata[i * 4]     = u;
        metadata[i * 4 + 1] = v;
        metadata[i * 4 + 2] = tubeT;
        metadata[i * 4 + 3] = isSpray;

        // Base torus position (will be animated each frame)
        const r = R_MAJOR + R_TUBE * tubeT * Math.cos(v);
        positions[i * 3]     = r * Math.cos(u);
        positions[i * 3 + 1] = r * Math.sin(u);
        positions[i * 3 + 2] = R_TUBE * tubeT * Math.sin(v);

        // Color: gradient by u angle + tubeT
        const angleT = (Math.sin(u) * 0.5 + 0.5);
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
        // Spray particles are brighter
        if (isSpray) c.multiplyScalar(1.4);

        colors[i * 3]     = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
      geo.userData.metadata = metadata;

      // Round glow dot sprite
      const dotCanvas = document.createElement("canvas");
      dotCanvas.width = dotCanvas.height = 64;
      const dc   = dotCanvas.getContext("2d");
      const grad = dc.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0,   "rgba(255,255,255,1)");
      grad.addColorStop(0.35,"rgba(255,255,255,0.8)");
      grad.addColorStop(1,   "rgba(255,255,255,0)");
      dc.fillStyle = grad;
      dc.fillRect(0, 0, 64, 64);

      mat = new THREE.PointsMaterial({
        size: 0.018,
        vertexColors: true,
        map: new THREE.CanvasTexture(dotCanvas),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        opacity: 1,
      });

      particles = new THREE.Points(geo, mat);
      scene.add(particles);

      animate();
    };

    const startTime = Date.now();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = (Date.now() - startTime) / 1000;

      // Smooth mouse lerp
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.05;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.05;

      // Keep the ring stationary (sthir) facing forward. 
      // Only a very tiny tilt on mouse hover to feel 3D, no continuous spinning.
      particles.rotation.y = smoothMouse.x * 0.15;
      particles.rotation.x = smoothMouse.y * 0.15;
      particles.rotation.z = 0;

      // Animate positions using turbulence noise so molecules wave
      const pos  = geo.attributes.position;
      const meta = geo.userData.metadata;
      const N    = pos.count;

      const R_MAJOR = 1.75;
      const R_TUBE  = 0.38;

      for (let i = 0; i < N; i++) {
        const u      = meta[i * 4];
        const v      = meta[i * 4 + 1];
        const tubeT  = meta[i * 4 + 2];
        const isSpray = meta[i * 4 + 3];

        // Turbulence displacement — waves on the ring surface
        const noiseAmt = isSpray ? 0.65 : 0.35; // increased amplitude for visible fluid motion
        const noise = turbulence(u, v, t) * noiseAmt;
        const effectiveTube = tubeT + noise;

        const r = R_MAJOR + R_TUBE * effectiveTube * Math.cos(v);
        pos.setXYZ(
          i,
          r * Math.cos(u),
          r * Math.sin(u),
          R_TUBE * effectiveTube * Math.sin(v)
        );
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const onMouseMove = (e) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    };

    const onResize = () => {
      if (!renderer || !camera || !mountRef.current) return;
      W = mountRef.current.clientWidth;
      H = mountRef.current.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize",    onResize);
    init();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize",    onResize);
      geo?.dispose();
      mat?.dispose();
      renderer?.dispose();
      if (mountRef.current && renderer?.domElement) {
        try { mountRef.current.removeChild(renderer.domElement); } catch {}
      }
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
  );
}
