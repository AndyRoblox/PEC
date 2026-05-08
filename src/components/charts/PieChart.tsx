export interface PieDatum {
  label: string
  value: number
  color?: string
}

interface PieChartProps {
  data: PieDatum[]
  title?: string
  subtitle?: string
  className?: string
}

const FALLBACK_COLORS = ['#477a72', '#ffd06d', '#fa7995', '#a78bfa', '#60a5fa', '#34d399']

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function slicePath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const start = polarToCartesian(cx, cy, r, startDeg)
  const end   = polarToCartesian(cx, cy, r, endDeg)
  const largeArc = endDeg - startDeg > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${start.x.toFixed(3)} ${start.y.toFixed(3)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(3)} ${end.y.toFixed(3)} Z`
}

export function PieChart({ data, title, subtitle, className = '' }: PieChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1

  let cursor = 0
  const slices = data.map((item, i) => {
    const pct   = item.value / total
    const start = cursor
    const end   = cursor + pct * 360
    cursor = end
    return { ...item, start, end, color: item.color ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length] }
  })

  return (
    <div className={`bg-white rounded-xl border border-gray-100 p-5 flex flex-col ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title    && <h3 className="font-heading font-semibold text-primary-dark text-base leading-tight">{title}</h3>}
          {subtitle && <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>}
        </div>
      )}

      <div className="flex items-center gap-5 flex-1 min-h-0">
        {/* SVG pie */}
        <svg
          viewBox="0 0 100 100"
          className="w-32 h-32 flex-shrink-0"
          role="img"
          aria-label={title ?? 'Pie chart'}
        >
          {slices.map((s, i) => (
            <path
              key={i}
              d={slicePath(50, 50, 42, s.start, s.end)}
              fill={s.color}
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Legend */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {slices.map((s, i) => {
            const pct = Math.round((s.value / total) * 100)
            return (
              <div key={i} className="flex items-center gap-2 min-w-0">
                <div
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-[11px] text-gray-500 truncate flex-1">{s.label}</span>
                <span className="text-[11px] font-medium text-gray-700 flex-shrink-0">{pct}%</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
