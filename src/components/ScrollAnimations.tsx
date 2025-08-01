import React, { useEffect, useRef } from 'react';

interface ScrollAnimationsProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'glow' | 'scaleIn' | 'slideInUp';
  delay?: number;
  threshold?: number;
}

const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Initially hide the element
    element.style.opacity = '0';
    element.style.transform = getInitialTransform(animation);
    element.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate in
            setTimeout(() => {
              if (element) {
                element.style.opacity = '1';
                element.style.transform = getFinalTransform(animation);
                
                // Add glow effect if specified
                if (animation === 'glow') {
                  element.classList.add('glow-effect');
                }
              }
            }, delay);
          } else {
            // Reset animation when out of view
            if (element) {
              element.style.opacity = '0';
              element.style.transform = getInitialTransform(animation);
              if (animation === 'glow') {
                element.classList.remove('glow-effect');
              }
            }
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [animation, delay, threshold]);

  const getInitialTransform = (type: string): string => {
    switch (type) {
      case 'slideUp':
      case 'fadeInUp':
      case 'slideInUp':
        return 'translateY(20px)';
      case 'slideLeft':
      case 'fadeInLeft':
        return 'translateX(-20px)';
      case 'slideRight':
      case 'fadeInRight':
        return 'translateX(20px)';
      case 'scale':
      case 'scaleIn':
        return 'scale(0.95)';
      case 'glow':
        return 'scale(1)';
      case 'fadeIn':
      default:
        return 'translateY(0)';
    }
  };

  const getFinalTransform = (type: string): string => {
    switch (type) {
      case 'slideUp':
      case 'slideLeft':
      case 'slideRight':
      case 'fadeInUp':
      case 'slideInUp':
        return 'translateY(0)';
      case 'fadeInLeft':
      case 'fadeInRight':
        return 'translateX(0)';
      case 'scale':
      case 'scaleIn':
        return 'scale(1)';
      case 'glow':
        return 'scale(1.05)';
      case 'fadeIn':
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
