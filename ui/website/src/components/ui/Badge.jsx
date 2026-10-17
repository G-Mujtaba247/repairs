import React from 'react'
import { cn } from '@/lib/utils'

const Badge = ({ children, variant = 'default', className = '' }) => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  const variants = {
    default: 'bg-muted text-muted-foreground',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    info: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300',
  }

  return (
    <span className={cn(base, variants[variant] || variants.default, className)}>
      {children}
    </span>
  )
}

export default React.memo(Badge)
