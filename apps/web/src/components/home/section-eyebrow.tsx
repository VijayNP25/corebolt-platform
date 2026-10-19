import type { ReactNode } from "react";

interface SectionEyebrowProps {
  children: ReactNode;
  icon?: ReactNode;
  centered?: boolean;
  className?: string;
}

export default function SectionEyebrow({
  children,
  icon,
  centered,
  className,
}: SectionEyebrowProps) {
  return (
    <div
      className={`home-eyebrow ${centered ? "justify-center w-full" : ""} ${className ?? ""}`}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
}
