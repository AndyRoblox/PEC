export interface BarDatum {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  data: BarDatum[]
  title?: string
  subtitle?: string
  maxValue?: number
  className?: string
}

export function BarChart({ data, title, subtitle, maxValue, className = '' }: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1)

  return (
    <div className={`bg-white rounded-xl border border-gray-100 p-5 flex flex-col ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title    && <h3 className="font-heading font-semibold text-primary-dark text-base leading-tight">{title}</h3>}
          {subtitle && <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>}
        </div>
      )}

      {/* Bars */}
      <div className="flex items-end gap-2 flex-1" style={{ minHeight: '100px' }}>
        {data.map((item, i) => {
          const pct = Math.round((item.value / max) * 100)
          const color = item.color ?? '#477a72'
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full min-w-0">
              <span className="text-[10px] text-gray-400 font-medium leading-none">{item.value}</span>
              <div className="w-full flex-1 relative rounded-t-sm overflow-hidden bg-gray-100">
                <div
                  className="absolute bottom-0 w-full rounded-t-sm transition-all duration-700 ease-out"
                  style={{ height: `${pct}%`, backgroundColor: color }}
                />
              </div>
              <span className="text-[10px] text-gray-400 truncate w-full text-center leading-none">
                {item.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      {data.length <= 6 && (
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-sm flex-shrink-0"
                style={{ backgroundColor: item.color ?? '#477a72' }}
              />
              <span className="text-[10px] text-gray-500 truncate">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
