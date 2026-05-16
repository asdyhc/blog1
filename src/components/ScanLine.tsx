export default function ScanLine() {
  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden opacity-[0.03]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-transparent via-neon-cyan/50 to-transparent animate-scan-line"
      />
    </div>
  )
}