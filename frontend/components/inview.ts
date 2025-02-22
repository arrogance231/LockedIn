import { useState, useEffect, useRef, RefObject } from "react";

export function useInView(
  threshold = 0.3
): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement); // Forces ref type
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
}
