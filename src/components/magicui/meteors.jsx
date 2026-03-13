import { useMemo } from "react";

export function Meteors({ number = 20 }) {
  const meteors = useMemo(() => {
    return Array.from({ length: number }, (_, i) => ({
      id: i,
      top: Math.floor(Math.random() * 100),
      left: Math.floor(Math.random() * 100),
      delay: Math.random() * 2,
      duration: Math.random() * 8 + 5,
      size: Math.random() * 1 + 0.5,
    }));
  }, [number]);

  return (
    <>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="animate-meteor pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
            width: `${meteor.size * 80}px`,
          }}
        >
          <span
            className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2"
            style={{
              background: "linear-gradient(90deg, #64748b, transparent)",
            }}
          />
        </span>
      ))}
    </>
  );
}