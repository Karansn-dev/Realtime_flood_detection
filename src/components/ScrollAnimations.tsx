import React, { useEffect, useRef } from 'react';

interface ScrollAnimationsProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'glow';
  delay?: number;
  threshold?: number;
}

const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({
  children,
  className = '',
  animationType = 'fadeIn',
  delay = 0,
  threshold = 0.1
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Initially hide the element
    element.style.opacity = '0';
    element.style.transform = getInitialTransform(animationType);
    element.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate in
            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = getFinalTransform(animationType);
              
              // Add glow effect if specified
              if (animationType === 'glow') {
                element.style.boxShadow = '0 0 20px rgba(20, 184, 166, 0.3)';
              }
            }, delay);
          }
        });
      },
      {
        threshold,
        rootMargin: '50px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animationType, delay, threshold]);

  const getInitialTransform = (type: string): string => {
    switch (type) {
      case 'slideUp':
        return 'translateY(50px)';
      case 'slideLeft':
        return 'translateX(-50px)';
      case 'slideRight':
        return 'translateX(50px)';
      case 'scale':
        return 'scale(0.8)';
      case 'glow':
        return 'scale(0.95)';
      default:
        return 'translateY(20px)';
    }
  };

  const getFinalTransform = (type: string): string => {
    switch (type) {
      case 'slideUp':
      case 'slideLeft':
      case 'slideRight':
        return 'translateX(0) translateY(0)';
      case 'scale':
      case 'glow':
        return 'scale(1)';
      default:
        return 'translateY(0)';
    }
  };

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollAnimations;
