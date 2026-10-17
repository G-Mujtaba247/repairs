import React from 'react'
import { cn } from '@/lib/utils'

const Stepper = ({ steps = [], current = 0 }) => {
  return (
    <ol className="flex items-center gap-4 w-full">
      {steps.map((s, i) => {
        const state = i < current ? 'complete' : i === current ? 'current' : 'upcoming'
        return (
          <li key={s.key || i} className="flex-1">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold transition-all',
                  state === 'complete' ? 'bg-primary text-white' : state === 'current' ? 'bg-primary/10 text-primary border border-primary' : 'bg-muted/30 text-muted-foreground'
                )}
              >
                {state === 'complete' ? '✓' : i + 1}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{s.title}</span>
                {s.subtitle && <span className="text-xs text-muted-foreground">{s.subtitle}</span>}
              </div>
            </div>
            {i < steps.length - 1 && <div className="h-[1px] bg-border mt-3 w-full" />}
          </li>
        )
      })}
    </ol>
  )
}

export default React.memo(Stepper)
