import React, { useEffect, useRef } from 'react';

interface ScrollAnimationsProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInUp';
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delay, threshold]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-1000 ease-out';
    const initialClasses = 'opacity-0 transform';
    const animatedClasses = 'animate-in:opacity-100 animate-in:transform-none';

    switch (animation) {
      case 'fadeInUp':
        return `${baseClasses} ${initialClasses} translate-y-8 ${animatedClasses}`;
      case 'fadeInLeft':
        return `${baseClasses} ${initialClasses} -translate-x-8 ${animatedClasses}`;
      case 'fadeInRight':
        return `${baseClasses} ${initialClasses} translate-x-8 ${animatedClasses}`;
      case 'scaleIn':
        return `${baseClasses} ${initialClasses} scale-95 ${animatedClasses}`;
      case 'slideInUp':
        return `${baseClasses} ${initialClasses} translate-y-12 ${animatedClasses}`;
      default:
        return `${baseClasses} ${initialClasses} translate-y-8 ${animatedClasses}`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimations;