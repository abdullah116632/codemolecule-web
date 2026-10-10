"use client";

import { useRef, useState } from "react";

export function SpotlightCard({
  children,
  className = "",
  as: Component = "div",
  tilt = false,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [tiltState, setTiltState] = useState({ rotateX: 0, rotateY: 0, isHovered: false });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
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
    setOpacity(1);
  };

  const handleMouseLeave = () => {
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
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out"
        style={{
          opacity,
          backgroundImage: `radial-gradient(rgb(34 197 94 / 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '22px 22px',
          maskImage: `radial-gradient(260px circle at ${position.x}px ${position.y}px, black 30%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(260px circle at ${position.x}px ${position.y}px, black 30%, transparent 100%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out mix-blend-multiply"
        style={{
          opacity,
          background: `radial-gradient(380px circle at ${position.x}px ${position.y}px, rgba(34, 197, 94, 0.15), transparent 65%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </Component>
  );
}
