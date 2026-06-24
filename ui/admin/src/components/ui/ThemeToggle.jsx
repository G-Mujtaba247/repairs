import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeProvider'

const ThemeToggle = () => {
  const { theme, toggle } = useTheme()
  return (
    <button onClick={toggle} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700">
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      <span className="text-sm text-gray-200">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  )
}

export default React.memo(ThemeToggle)
