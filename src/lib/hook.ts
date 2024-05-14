import { MutableRefObject, useEffect, useState } from "react";

export function useVisibility(
  ref: MutableRefObject<Element | null>,
  { once = false },
  rootMargin = "0px"
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && once) {
          observer.disconnect();
        }
      },
      {
        rootMargin,
      }
    );

    const currentElement = ref.current;
    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [ref, rootMargin, once]);

  return isVisible;
}
