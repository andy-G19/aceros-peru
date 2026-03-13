import { useRef, useState, useCallback } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function MagicCard({
  children,
  className = "",
  gradientSize = 200,
  gradientColor = "#ea580c",
  gradientOpacity = 0.15,
  gradientFrom = "#ea580c",
  gradientTo = "#f97316",
}) {
  const cardRef = useRef(null);
  const [gradientPos, setGradientPos] = useState({ x: -999, y: -999 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setGradientPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setGradientPos({ x: -999, y: -999 });
      }}
      className={cn("relative overflow-hidden rounded-xl", className)}
      style={{
        background: isHovered
          ? `radial-gradient(${gradientSize}px circle at ${gradientPos.x}px ${gradientPos.y}px, ${gradientColor}${Math.round(gradientOpacity * 255).toString(16).padStart(2, "0")}, transparent 80%)`
          : "transparent",
      }}
    >
      {/* Border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${gradientSize}px circle at ${gradientPos.x}px ${gradientPos.y}px, ${gradientFrom}33, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}