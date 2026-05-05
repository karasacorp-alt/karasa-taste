"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollFadeIn({ children, delay = 0, className = "", style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("in-view"), delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`fade-in ${className}`} style={style}>
      {children}
    </div>
  );
}
