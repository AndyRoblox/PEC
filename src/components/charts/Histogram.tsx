export interface FrequencyPolygonSeries {
  name: string
  color?: string
  values: number[]
}

interface FrequencyPolygonProps {
  labels: string[]
  series: FrequencyPolygonSeries[]
  title?: string
  subtitle?: string
  maxValue?: number
  className?: string
}

const FALLBACK_COLORS = ['#477a72', '#ffd06d', '#fa7995', '#a78bfa', '#60a5fa']
const PAD = { t: 18, r: 10, b: 30, l: 32 }
const W = 300
const H = 140
const PLOT_W = W - PAD.l - PAD.r
const PLOT_H = H - PAD.t - PAD.b
const BOTTOM = PAD.t + PLOT_H

export function FrequencyPolygon({
  labels,
  series,
  title,
  subtitle,
  maxValue,
  className = '',
}: FrequencyPolygonProps) {
  const n = labels.length
  const allValues = series.flatMap((s) => s.values)
  const max = maxValue ?? Math.max(...allValues, 1)

  const px = (i: number) => PAD.l + (n > 1 ? (i / (n - 1)) * PLOT_W : PLOT_W / 2)
  const py = (v: number) => PAD.t + (1 - v / max) * PLOT_H

  const yTicks = [max, Math.round(max / 2), 0]

  return (
    <div className={`bg-white rounded-xl border border-gray-100 p-5 flex flex-col ${className}`}>
      {(title || subtitle) && (
        <div className="mb-3">
          {title    && <h3 className="font-heading font-semibold text-primary-dark text-base leading-tight">{title}</h3>}
          {subtitle && <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>}
        </div>
      )}

      <div className="flex-1 min-h-0">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full"
          style={{ minHeight: '120px' }}
          role="img"
          aria-label={title ?? 'Frequency polygon'}
        >
          {/* Grid lines + Y-axis labels */}
          {yTicks.map((tick) => {
            const y = py(tick)
            return (
              <g key={tick}>
                <line
                  x1={PAD.l} y1={y} x2={PAD.l + PLOT_W} y2={y}
                  stroke="#e5e7eb" strokeWidth="0.8"
                  strokeDasharray={tick === 0 ? undefined : '3 3'}
                />
                <text x={PAD.l - 4} y={y} textAnchor="end" dominantBaseline="middle" fontSize="8" fill="#9ca3af">
                  {tick}
                </text>
              </g>
            )
          })}

          {/* One layer per series */}
          {series.map((s, si) => {
            const color = s.color ?? FALLBACK_COLORS[si % FALLBACK_COLORS.length]
            const pts = s.values.map((v, i) => `${px(i).toFixed(2)},${py(v).toFixed(2)}`).join(' ')
            const area = [
              `M ${px(0).toFixed(2)} ${BOTTOM}`,
              ...s.values.map((v, i) => `L ${px(i).toFixed(2)} ${py(v).toFixed(2)}`),
              `L ${px(s.values.length - 1).toFixed(2)} ${BOTTOM}`,
              'Z',
            ].join(' ')

            return (
              <g key={si}>
                <path d={area} fill={color} fillOpacity="0.10" />
                <polyline
                  points={pts}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {s.values.map((v, i) => (
                  <circle
                    key={i}
                    cx={px(i)} cy={py(v)} r="3"
                    fill="white" stroke={color} strokeWidth="1.8"
                  />
                ))}
              </g>
            )
          })}

          {/* X-axis labels */}
          {labels.map((label, i) => (
            <text key={i} x={px(i)} y={BOTTOM + 12} textAnchor="middle" fontSize="8" fill="#9ca3af">
              {label}
            </text>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
        {series.map((s, si) => (
          <div key={si} className="flex items-center gap-1.5">
            <div
              className="w-4 h-0.5 flex-shrink-0 rounded-full"
              style={{ backgroundColor: s.color ?? FALLBACK_COLORS[si % FALLBACK_COLORS.length] }}
            />
            <span className="text-[10px] text-gray-500">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
