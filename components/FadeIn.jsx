'use client';

import { useEffect, useRef, useState } from 'react';

export default function FadeIn({ children, delay = 0, direction = 'up', className = '', once = true }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const offsets = {
    up: 'translate3d(0, 30px, 0)',
    down: 'translate3d(0, -30px, 0)',
    left: 'translate3d(30px, 0, 0)',
    right: 'translate3d(-30px, 0, 0)',
    none: 'translate3d(0, 0, 0)',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0,0,0)' : (offsets[direction] || offsets.up),
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
