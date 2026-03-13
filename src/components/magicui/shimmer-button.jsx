import { useRef } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ShimmerButton({
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "8px",
  background = "rgba(234, 88, 12, 1)",
  className = "",
  children,
  onClick,
  ...props
}) {
  return (
    <button
      style={{
        "--shimmer-color": shimmerColor,
        "--shimmer-size": shimmerSize,
        "--shimmer-duration": shimmerDuration,
        "--border-radius": borderRadius,
        "--background": background,
        borderRadius,
      }}
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--background)]",
        "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
        "hover:shadow-lg",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {/* Shimmer */}
      <div
        className="absolute inset-0 overflow-visible [container-type:size]"
      >
        <div
          className="animate-shimmer-slide absolute inset-0 h-[100cqh] rounded-full"
          style={{
            background: `conic-gradient(from calc(270deg - (180deg * var(--shimmer-size))) at 50% 50%, transparent 0, var(--shimmer-color) 1deg, transparent calc(var(--shimmer-size) * 360deg * 1deg))`,
            animationDuration: shimmerDuration,
          }}
        />
      </div>

      {/* Spark */}
      <div
        className="absolute inset-[1px] rounded-[inherit]"
        style={{
          background: background,
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}