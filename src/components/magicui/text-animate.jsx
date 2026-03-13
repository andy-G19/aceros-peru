import { useRef, useState, useEffect } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const defaultContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export function TextAnimate({
  children,
  className = "",
  segmentClassName = "",
  delay = 0,
  duration = 0.3,
  variants,
  by = "word",
  startOnView = true,
  once = true,
  animation = "fadeIn",
  as: Tag = "p",
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(!startOnView);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!startOnView) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasAnimated || !once) {
            setIsVisible(true);
            setHasAnimated(true);
          }
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, once, hasAnimated]);

  const segments =
    by === "word"
      ? children.split(/(\s+)/)
      : by === "character"
      ? children.split("")
      : [children];

  const getInitialStyle = () => {
    switch (animation) {
      case "slideUp": return { opacity: 0, transform: "translateY(20px)" };
      case "slideDown": return { opacity: 0, transform: "translateY(-20px)" };
      case "slideLeft": return { opacity: 0, transform: "translateX(20px)" };
      case "slideRight": return { opacity: 0, transform: "translateX(-20px)" };
      case "scaleUp": return { opacity: 0, transform: "scale(0.8)" };
      case "blurIn": return { opacity: 0, filter: "blur(10px)" };
      default: return { opacity: 0 };
    }
  };

  const getFinalStyle = () => ({
    opacity: 1,
    transform: "none",
    filter: "none",
  });

  return (
    <Tag ref={ref} className={cn("inline", className)}>
      {segments.map((segment, i) => {
        const isSpace = /^\s+$/.test(segment);
        if (isSpace) return <span key={i}>{segment}</span>;

        const segDelay = delay + i * 0.05;

        return (
          <span
            key={i}
            className={cn("inline-block", segmentClassName)}
            style={{
              ...(isVisible ? getFinalStyle() : getInitialStyle()),
              transition: `all ${duration}s ease ${segDelay}s`,
              whiteSpace: by === "word" ? "pre" : "normal",
            }}
          >
            {segment}
          </span>
        );
      })}
    </Tag>
  );
}