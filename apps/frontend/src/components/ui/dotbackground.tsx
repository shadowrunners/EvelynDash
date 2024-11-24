import { ReactNode } from "react";

export function DotBackground({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full bg-black bg-dot-white/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      {children}
    </div>
  );
}