"use client";

import { useEffect, useRef, useId } from "react";

export function LogoMark({ className = "h-14 w-14" }) {
  const rawId = useId();
  // Safe sanitized ID without colons for SVG selectors
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, "_");
  const gooId = `cm-goo-${id}`;
  const jellyId = `cm-jelly-${id}`;

  const svgRef = useRef(null);
  const streamRef = useRef(null);
  const cPathRef = useRef(null);
  const cWrapRef = useRef(null);
  const cFilterRef = useRef(null);
  const noiseRef = useRef(null);
  const dmapRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (reduce || isMobile) return;

    const NS = "http://www.w3.org/2000/svg";
    const T = 7000; // 7s loop, synced with CSS --t
    const rnd = (i) => {
      const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    const sLayer = streamRef.current;
    const cPath = cPathRef.current;
    const cWrap = cWrapRef.current;
    const cFilter = cFilterRef.current;
    const noise = noiseRef.current;
    const dmap = dmapRef.current;

    if (!sLayer || !cPath || !cWrap || !cFilter || !noise || !dmap) return;

    // Reset stream droplets
    while (sLayer.firstChild) {
      sLayer.removeChild(sLayer.firstChild);
    }

    const createdAnimations = [];

    // 1) Droplets streaming from the server into the laptop and phone
    ["M1110 880 L1400 670", "M1110 1060 L1390 1270"].forEach((d, k) => {
      for (let j = 0; j < 7; j++) {
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("r", (34 + rnd(j + k * 9) * 12).toFixed(1));
        c.style.offsetPath = `path('${d}')`;
        c.style.offsetRotate = "0deg";
        sLayer.appendChild(c);

        const b = 0.31 + j * 0.03;
        const e = b + 0.1;
        if (typeof c.animate === "function") {
          const anim = c.animate(
            [
              { offsetDistance: "0%", opacity: 0, offset: 0 },
              { offsetDistance: "0%", opacity: 0, offset: Math.max(0, b - 0.001) },
              { offsetDistance: "0%", opacity: 1, offset: b, easing: "ease-in-out" },
              { offsetDistance: "100%", opacity: 1, offset: e },
              { offsetDistance: "100%", opacity: 0, offset: Math.min(1, e + 0.001) },
              { offsetDistance: "100%", opacity: 0, offset: 1 },
            ],
            { duration: T, iterations: Infinity }
          );
          createdAnimations.push(anim);
        }
      }
    });

    // 2) Morphing the "C": curls into a jelly ball, flows into the server, then pours back out
    const S0 = { cx: 960, cy: 960, R: 520, W: 210 };
    const BALL = { cx: 600, cy: 960, R: 0.5, W: 330 };
    const HUB = { cx: 958, cy: 968, R: 0.5, W: 40 };

    const lerp = (a, b, u) => a + (b - a) * u;
    const mix = (A, B, u) => ({
      cx: lerp(A.cx, B.cx, u),
      cy: lerp(A.cy, B.cy, u),
      R: Math.max(0.5, lerp(A.R, B.R, u)),
      W: Math.max(1, lerp(A.W, B.W, u)),
    });
    const easeInOut = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
    const easeIn = (u) => u * u * u;
    const backOut = (u, c1) => {
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2);
    };

    function frameAt(p) {
      return { s: S0, sx: 1, sy: 1, amp: 0 };
    }

    const A1 = (22 * Math.PI) / 180;
    const A2 = (158 * Math.PI) / 180;

    function draw(f, now) {
      const s = f.s;
      if (!s) {
        cWrap.style.display = "none";
        return;
      }
      cWrap.style.display = "";

      const sx0 = s.cx + s.R * Math.sin(A1);
      const sy0 = s.cy - s.R * Math.cos(A1);
      const ex0 = s.cx + s.R * Math.sin(A2);
      const ey0 = s.cy - s.R * Math.cos(A2);
      cPath.setAttribute(
        "d",
        `M${sx0.toFixed(1)} ${sy0.toFixed(1)}A${s.R.toFixed(1)} ${s.R.toFixed(1)} 0 1 0 ${ex0.toFixed(1)} ${ey0.toFixed(1)}`
      );
      cPath.setAttribute("stroke-width", s.W.toFixed(1));

      // Jelly squash & stretch around center
      cWrap.setAttribute(
        "transform",
        `translate(${s.cx.toFixed(1)} ${s.cy.toFixed(1)}) scale(${f.sx.toFixed(4)} ${f.sy.toFixed(4)}) translate(${(-s.cx).toFixed(1)} ${(-s.cy).toFixed(1)})`
      );

      // Soft wobbling edges
      if (f.amp > 0.8) {
        noise.setAttribute(
          "baseFrequency",
          `${(0.0045 + 0.0008 * Math.sin(now / 280)).toFixed(5)} ${(0.0045 + 0.0008 * Math.cos(now / 240)).toFixed(5)}`
        );
        dmap.setAttribute("scale", f.amp.toFixed(1));
        cFilter.setAttribute("filter", `url(#${jellyId})`);
      } else {
        cFilter.removeAttribute("filter");
      }
    }

    const getNow = () => (document.timeline?.currentTime ?? performance.now());
    const t0 = getNow();

    if (svgRef.current?.getAnimations) {
      svgRef.current.getAnimations().forEach((a) => {
        try {
          a.startTime = t0;
        } catch (_) {}
      });
    }

    let animId;
    function tick() {
      const now = getNow();
      const p = ((((now - t0) % T) + T) % T) / T;
      draw(frameAt(p), now);
      animId = requestAnimationFrame(tick);
    }
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      createdAnimations.forEach((a) => {
        try {
          a.cancel();
        } catch (_) {}
      });
    };
  }, [jellyId]);

  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center ${className}`}>
      <svg
        ref={svgRef}
        className="live-logo h-full w-full block select-none"
        viewBox="0 0 1932 1932"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Code Molecule Live Logo"
      >
        <defs>
          {/* Gooey filter for the liquid stream */}
          <filter id={gooId} filterUnits="userSpaceOnUse" x="0" y="0" width="1932" height="1932" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="26" />
            <feColorMatrix mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -12" />
          </filter>

          {/* Jelly filter for wobble */}
          <filter id={jellyId} filterUnits="userSpaceOnUse" x="0" y="0" width="1932" height="1932" colorInterpolationFilters="sRGB">
            <feTurbulence ref={noiseRef} type="fractalNoise" baseFrequency="0.0045 0.0045" numOctaves="1" seed="4" result="n" />
            <feDisplacementMap ref={dmapRef} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" result="d" />
            <feGaussianBlur in="d" stdDeviation="5" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" />
          </filter>
        </defs>

        {/* The big "C": morphed by frameAt */}
        <g ref={cFilterRef}>
          <g ref={cWrapRef}>
            <path
              ref={cPathRef}
              d="M1153 478 A520 520 0 1 0 1153 1442"
              fill="none"
              stroke="var(--c-dark)"
              strokeWidth="210"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Connector lines (base) */}
        <g stroke="var(--c-light)" strokeWidth="70" strokeLinecap="round" fill="none">
          <path d="M1110 880 L1400 670" />
          <path d="M1110 1060 L1390 1270" />
        </g>

        {/* Green liquid flowing along the connectors */}
        <g filter={`url(#${gooId})`}>
          <g stroke="var(--c-dark)" strokeWidth="70" strokeLinecap="round" fill="none">
            <path className="fill-line" pathLength="100" d="M1110 880 L1400 670" />
            <path className="fill-line" pathLength="100" d="M1110 1060 L1390 1270" />
          </g>
          <g ref={streamRef} className="drops" />
        </g>

        {/* Hub (server) */}
        <g className="hub">
          <circle cx="958" cy="968" r="212" fill="var(--c-light)" />
          <circle className="tint" cx="958" cy="968" r="212" />
          <circle className="glow" cx="958" cy="968" r="212" />
          <g fill="var(--icon-white)">
            <rect x="830" y="872" width="254" height="55" rx="22" />
            <rect x="830" y="941" width="254" height="53" />
            <rect x="830" y="1008" width="254" height="55" rx="22" />
          </g>
          <g fill="var(--icon-grey)">
            <circle cx="1014" cy="899" r="9" />
            <circle cx="1047" cy="899" r="12" />
            <circle cx="1014" cy="967" r="9" />
            <circle cx="1047" cy="967" r="12" />
            <circle cx="1014" cy="1036" r="9" />
            <circle cx="1047" cy="1036" r="12" />
            <circle className="led l1" cx="867" cy="967" r="7" />
            <circle className="led l2" cx="889" cy="967" r="7" />
            <circle className="led l3" cx="912" cy="967" r="7" />
            <circle className="led l3" cx="867" cy="1036" r="7" />
            <circle className="led l1" cx="889" cy="1036" r="7" />
            <circle className="led l2" cx="912" cy="1036" r="7" />
          </g>
        </g>

        {/* Top node (laptop) */}
        <g className="pop">
          <circle className="burst" cx="1471" cy="583" r="174" />
          <circle className="flash" cx="1471" cy="583" r="174" />
          <rect x="1373" y="500" width="196" height="136" rx="14" fill="var(--icon-white)" />
          <rect x="1393" y="520" width="156" height="99" fill="var(--icon-grey)" />
          <path d="M1357 641 H1583 Q1580 660 1560 660 H1380 Q1360 660 1357 641 Z" fill="var(--icon-white)" />
        </g>

        {/* Bottom node (phone) */}
        <g className="pop">
          <circle className="burst" cx="1467" cy="1335" r="174" />
          <circle className="flash" cx="1467" cy="1335" r="174" />
          <rect x="1397" y="1220" width="140" height="228" rx="22" fill="var(--icon-white)" />
          <rect x="1415" y="1246" width="105" height="156" fill="var(--icon-grey)" />
          <circle cx="1467" cy="1423" r="10" fill="var(--icon-grey)" />
        </g>
      </svg>
    </span>
  );
}

export function Logo({ className = "", onDark = false }) {
  return (
    <span className={`inline-flex items-center gap-1.5 sm:gap-3 ${className}`}>
      <LogoMark className="h-[32px] w-[32px] sm:h-[72px] sm:w-[72px] shrink-0 drop-shadow-sm" />

      <span
        lang="en"
        translate="no"
        className={`logo-text text-[14px] leading-none sm:text-[24px] font-bold tracking-tight select-none text-white`}
      >
        Code Molecule
      </span>
    </span>
  );
}
