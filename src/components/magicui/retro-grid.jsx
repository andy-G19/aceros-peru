function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function RetroGrid({
  className = "",
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
}) {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        className,
      )}
      style={gridStyles}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className="animate-grid [background-image:linear-gradient(to_right,rgba(128,128,128,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(128,128,128,0.3)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]"
        />
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent to-90%" />
    </div>
  );
}