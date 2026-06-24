import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './card'

const Sparkline = ({ values = [] }) => {
  const max = Math.max(...values, 1)
  const points = values.map((v, i) => `${(i / (values.length - 1)) * 100},${100 - (v / max) * 100}`).join(' ')
  return (
    <svg viewBox="0 0 100 100" className="w-full h-8">
      <polyline fill="none" strokeWidth="2" stroke="currentColor" points={points} className="opacity-80" />
    </svg>
  )
}

const StatsCard = ({ title, value, delta, sparkValues = [] }) => {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-2">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold">{value}</div>
            {delta && <div className="text-sm text-muted-foreground">{delta}</div>}
          </div>
          <div className="w-32 text-muted-foreground">
            <Sparkline values={sparkValues} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default React.memo(StatsCard)
