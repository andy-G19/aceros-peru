import { useRef, useState, useEffect } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  className = "",
  prefix = "",
  suffix = "",
}) {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(startValue);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const timer = setTimeout(() => {
      const start = direction === "up" ? startValue : value;
      const end = direction === "up" ? value : startValue;
      const duration = 2000;
      const startTime = performance.now();

      const tick = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = start + (end - start) * easedProgress;
        setDisplayValue(parseFloat(current.toFixed(decimalPlaces)));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [started, value, startValue, direction, delay, decimalPlaces]);

  return (
    <span ref={ref} className={cn("tabular-nums tracking-tight", className)}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}