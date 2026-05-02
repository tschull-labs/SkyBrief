export default function GlassCard({ children, className = '', onClick }) {
  return (
    <div
      className={`glass-card p-4 ${onClick ? 'cursor-pointer transition-shadow duration-200 hover:shadow-md active:scale-[0.99]' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
