'use client';
import { useEffect, useRef } from 'react';

export default function NetworkMesh() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Plexus settings
    const numParticles = 90;
    const connectionDistance = 140;
    const mouseConnectionDistance = 180;
    const cardConnectionDistance = 160;
    
    let mouse = { x: -1000, y: -1000 };
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const resize = () => {
      const parent = canvas.parentElement;
      // High-DPI support
      const dpr = window.devicePixelRatio || 1;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        // use unscaled width/height for logical positioning
        const w = canvas.parentElement.clientWidth;
        const h = canvas.parentElement.clientHeight;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 1.5 + 0.5;
        this.baseColor = '34, 197, 94'; // brand-500
      }
      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges
        if (this.x < 0) { this.x = 0; this.vx *= -1; }
        if (this.x > w) { this.x = w; this.vx *= -1; }
        if (this.y < 0) { this.y = 0; this.vy *= -1; }
        if (this.y > h) { this.y = h; this.vy *= -1; }
      }
      draw(brightness = 1) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.baseColor}, ${0.3 * brightness})`;
        ctx.fill();
      }
    }

    const particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      ctx.clearRect(0, 0, w, h);
      
      // Find hovered card
      let hoveredCardCenter = null;
      const cards = document.querySelectorAll('[data-molecule-card]');
      cards.forEach(card => {
        if (card.matches(':hover')) {
          const rect = card.getBoundingClientRect();
          const canvasRect = canvas.getBoundingClientRect();
          hoveredCardCenter = {
            x: rect.left - canvasRect.left + rect.width / 2,
            y: rect.top - canvasRect.top + rect.height / 2
          };
        }
      });

      particles.forEach(p => {
        p.update(w, h);
        
        let pBrightness = 1;
        if (hoveredCardCenter) {
           const dx = p.x - hoveredCardCenter.x;
           const dy = p.y - hoveredCardCenter.y;
           const dist = Math.sqrt(dx * dx + dy * dy);
           if (dist < cardConnectionDistance * 1.5) {
             pBrightness = 2.5; // brighter near hovered card
           }
        }
        p.draw(pBrightness);
      });
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            let opacity = 1 - distance / connectionDistance;
            
            // Highlight connections near hovered card
            if (hoveredCardCenter) {
              const distToI = Math.hypot(particles[i].x - hoveredCardCenter.x, particles[i].y - hoveredCardCenter.y);
              const distToJ = Math.hypot(particles[j].x - hoveredCardCenter.x, particles[j].y - hoveredCardCenter.y);
              if (distToI < cardConnectionDistance && distToJ < cardConnectionDistance) {
                opacity = Math.min(1, opacity * 3);
                ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.8})`; // brighter cyan/green
              } else {
                ctx.strokeStyle = `rgba(34, 197, 94, ${opacity * 0.15})`; // dim normal
              }
            } else {
              ctx.strokeStyle = `rgba(34, 197, 94, ${opacity * 0.15})`; // dim normal
            }

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        
        // Mouse connection
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseConnectionDistance) {
          const opacity = 1 - distance / mouseConnectionDistance;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(34, 197, 94, ${opacity * 0.4})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 mix-blend-screen" />;
}
