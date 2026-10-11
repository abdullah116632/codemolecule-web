"use client";

import { useRef, useState, useEffect } from "react";

export function SpotlightCard({
  children,
  className = "",
  as: Component = "div",
  tilt = false,
  dots = false,
  spotlightColor = "rgba(34, 197, 94, 0.15)",
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [tiltState, setTiltState] = useState({ rotateX: 0, rotateY: 0, isHovered: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    };
    checkMobile();
    // Optional: add event listener if you expect device capability to change (like rotating a hybrid device), 
    // but run-once is usually sufficient for touch detection.
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    if (tilt) {
      const centerX = x - rect.width / 2;
      const centerY = y - rect.height / 2;
      const rotateX = (-centerY / rect.height) * 8;
      const rotateY = (centerX / rect.width) * 8;
      setTiltState({ rotateX, rotateY, isHovered: true });
    }
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setOpacity(0);
    if (tilt) {
      setTiltState({ rotateX: 0, rotateY: 0, isHovered: false });
    }
  };

  const transformStyle = tilt && tiltState.isHovered
    ? `perspective(1000px) rotateX(${tiltState.rotateX}deg) rotateY(${tiltState.rotateY}deg) translateY(-8px)`
    : tilt
    ? "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)"
    : undefined;

  const transitionStyle = tilt
    ? tiltState.isHovered
      ? "transform 0.12s ease-out, box-shadow 0.38s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.38s cubic-bezier(0.16, 1, 0.3, 1)"
      : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.38s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.38s cubic-bezier(0.16, 1, 0.3, 1)"
    : undefined;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...(props.style || {}),
        ...(transformStyle ? { transform: transformStyle } : {}),
        ...(transitionStyle ? { transition: transitionStyle } : {}),
      }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#141A28] transition duration-300 hover:border-brand-400/40 hover:bg-[#1E2536] hover:shadow-2xl hover:shadow-brand-950/40 ${
        !tilt ? "hover:-translate-y-1" : ""
      } ${className}`}
      {...props}
    >
      {!isMobile && dots && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out"
          style={{
            opacity,
            backgroundImage: `radial-gradient(${spotlightColor} 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            maskImage: `radial-gradient(250px circle at ${position.x}px ${position.y}px, black 20%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(250px circle at ${position.x}px ${position.y}px, black 20%, transparent 100%)`,
          }}
          aria-hidden="true"
        />
      )}
      {!isMobile && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out"
          style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
            mixBlendMode: "screen",
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </Component>
  );
}
