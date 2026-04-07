import React from "react";

interface SpiralRingsProps {
  count?: number;
}

export function SpiralRings({ count = 20 }: SpiralRingsProps) {
  return (
    <div className="flex justify-center items-end gap-[7px] h-7 px-8 select-none" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-[6px] rounded-t-full flex-shrink-0"
          style={{
            height: `${14 + Math.sin(i * 0.6) * 4}px`,
            background: "linear-gradient(to bottom, #b0b8c1, #7a8a96)",
            boxShadow: "inset -1px 0 2px rgba(0,0,0,0.2)",
          }}
        />
      ))}
    </div>
  );
}
