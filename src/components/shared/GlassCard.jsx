export default function GlassCard({ children, className = '', onClick }) {
  return (
    <div
      className={`glass-card p-4 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
