"use client";

import { Link } from "@/lib/wouter-compat";
import { cn } from "@/lib/utils";

type CoreBoltLogoProps = {
  variant?: "nav" | "footer";
  className?: string;
  href?: string;
  onClick?: () => void;
};

export default function CoreBoltLogo({
  variant = "nav",
  className,
  href = "/",
  onClick,
}: CoreBoltLogoProps) {
  const text = (
    <span
      className={cn(
        "corebolt-logo",
        variant === "footer" && "corebolt-logo--footer",
        className
      )}
    >
      CORE BOLT
      <sup className="corebolt-logo-tm">TM</sup>
    </span>
  );

  if (variant === "footer") {
    return text;
  }

  return (
    <Link href={href} className="nav-logo" onClick={onClick}>
      {text}
    </Link>
  );
}
