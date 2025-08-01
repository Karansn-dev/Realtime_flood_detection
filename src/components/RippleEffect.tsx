import React, { useEffect, useRef } from 'react';

interface RippleEffectProps {
  className?: string;
  intensity?: number;
  color?: string;
}

const RippleEffect: React.FC<RippleEffectProps> = ({ 
  className = '', 
  intensity = 1,
  color = '#0ea5e9'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const ripplesRef = useRef<Array<{
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    alpha: number;
    speed: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create ripples at random intervals
    const createRipple = () => {
      const ripple = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        maxRadius: 100 + Math.random() * 200,
        alpha: 0.6,
        speed: 1 + Math.random() * 2
      };
      ripplesRef.current.push(ripple);
    };

    // Create initial ripples
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createRipple(), i * 1000);
    }

    const rippleInterval = setInterval(() => {
      if (ripplesRef.current.length < 5) {
        createRipple();
      }
    }, 2000 + Math.random() * 3000);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw ripples
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        ripple.radius += ripple.speed * intensity;
        ripple.alpha = Math.max(0, 0.6 * (1 - ripple.radius / ripple.maxRadius));

        if (ripple.radius < ripple.maxRadius && ripple.alpha > 0) {
          // Draw ripple
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `${color}${Math.floor(ripple.alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw inner ripple
          if (ripple.radius > 20) {
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius - 20, 0, Math.PI * 2);
            ctx.strokeStyle = `${color}${Math.floor(ripple.alpha * 0.3 * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          return true;
        }
        return false;
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(rippleInterval);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [intensity, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default RippleEffect;