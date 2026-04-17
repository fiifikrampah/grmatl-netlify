/**
 * Minimal 7-day sparkline (tiny SVG bars). Values are plotted left→right
 * (oldest day first). Returns null when there is no activity so callers
 * can skip rendering decorative empty bars.
 */
export function Sparkline({
  values,
  className = '',
  color = '#1B5299',
}: {
  values: number[]
  className?: string
  color?: string
}) {
  const hasAny = values.some((v) => v > 0)
  if (!hasAny) return null

  const max = Math.max(...values, 1)
  const width = 84
  const height = 18
  const barWidth = width / values.length - 2

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
    >
      {values.map((v, i) => {
        const h = Math.max((v / max) * height, v > 0 ? 2 : 1.5)
        const x = i * (barWidth + 2)
        return (
          <rect
            key={i}
            x={x}
            y={height - h}
            width={barWidth}
            height={h}
            rx={1.5}
            fill={v > 0 ? color : '#E5E7EB'}
            opacity={v > 0 ? 0.9 : 1}
          />
        )
      })}
    </svg>
  )
}
