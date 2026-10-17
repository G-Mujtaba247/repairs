import React from 'react'

const Skeleton = ({ className = '', variant = 'text' }) => {
  const base = 'skeleton bg-muted/40 dark:bg-muted/30 rounded'
  const size = variant === 'avatar' ? 'w-10 h-10 rounded-full' : variant === 'title' ? 'h-6 w-3/4 mb-2' : 'h-4 w-full'
  return <div aria-hidden className={`${base} ${size} ${className}`} />
}

export default React.memo(Skeleton)
