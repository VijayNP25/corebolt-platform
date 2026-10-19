export default function SectionDivider() {
  return (
    <div
      className="h-px w-full max-w-7xl mx-auto opacity-60"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(118,185,0,0.45), transparent)",
      }}
      aria-hidden
    />
  );
}
