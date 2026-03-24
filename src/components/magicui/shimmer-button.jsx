function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ShimmerButton({
  shimmerColor = "#ffffff",
  shimmerDuration = "2s",
  borderRadius = "8px",
  background = "rgba(234, 88, 12, 1)",
  className = "",
  children,
  onClick,
  ...props
}) {
  return (
    <button
      style={{ borderRadius }}
      className={cn(
        "relative overflow-hidden px-6 py-3 text-white font-medium border border-white/10 cursor-pointer",
        "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px hover:shadow-lg",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {/* Solid background layer */}
      <span
        className="absolute inset-0"
        style={{ background, borderRadius }}
      />

      {/* Shimmer sweep layer */}
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius }}
        aria-hidden="true"
      >
        <span
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${shimmerColor}40 50%, transparent 60%)`,
            backgroundSize: "200% 100%",
            animation: `shimmer-sweep ${shimmerDuration} linear infinite`,
          }}
        />
      </span>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      <style>{`
        @keyframes shimmer-sweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </button>
  );
}