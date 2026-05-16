import { cn } from '@/utils/cn'

interface GlowButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  color?: string
}

export default function GlowButton({ children, onClick, className, color = '#00f0ff' }: GlowButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative px-8 py-3 font-mono text-sm tracking-wider rounded-lg',
        'border transition-all duration-300',
        'hover:scale-105 active:scale-95',
        className
      )}
      style={{
        borderColor: color,
        color: color,
        boxShadow: `0 0 10px ${color}33, inset 0 0 10px ${color}11`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 25px ${color}66, inset 0 0 20px ${color}22`
        e.currentTarget.style.backgroundColor = `${color}15`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 10px ${color}33, inset 0 0 10px ${color}11`
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      {children}
    </button>
  )
}