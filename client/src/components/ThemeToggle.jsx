import React from 'react'
import { useAppContext } from '../context/appContext'
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useAppContext();
  
  const themeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  
  return (
    <div className='fixed bottom-4 left-4 z-50'>
      <div className="relative">
        <button
          onClick={themeToggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className={`
            relative overflow-hidden
            w-12 h-12 
            bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900
            hover:from-blue-100 hover:to-blue-200 dark:hover:from-slate-700 dark:hover:to-slate-800
            border-2 border-blue-200 dark:border-slate-600
            rounded-full 
            shadow-lg hover:shadow-xl dark:shadow-slate-900/50
            transition-all duration-300 ease-in-out
            transform hover:scale-105 active:scale-95
            group
          `}
        >
          {/* Background animation overlay */}
          <div className={`
            absolute inset-0 rounded-full
            bg-gradient-to-r from-yellow-300 to-orange-300 dark:from-blue-500 dark:to-purple-600
            opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30
            transition-opacity duration-300
          `} />
          
          {/* Icon container with rotation animation */}
          <div className={`
            relative z-10 w-full h-full
            flex items-center justify-center
            transition-transform duration-500 ease-in-out
            ${theme === 'dark' ? 'rotate-180' : 'rotate-0'}
          `}>
            {theme === 'dark' ? (
              <Moon 
                size={18} 
                className="text-blue-100 drop-shadow-sm transition-colors duration-300" 
              />
            ) : (
              <Sun 
                size={18} 
                className="text-amber-600 drop-shadow-sm transition-colors duration-300" 
              />
            )}
          </div>
          
          {/* Ripple effect on click */}
          <div className={`
            absolute inset-0 rounded-full
            bg-white dark:bg-slate-300
            scale-0 opacity-0
            group-active:scale-110 group-active:opacity-20
            transition-all duration-200
          `} />
        </button>
        
        {/* Tooltip */}
        <div className={`
          absolute -top-12 left-1/2 transform -translate-x-1/2
          px-3 py-1 text-xs font-medium
          bg-gray-900 dark:bg-gray-100 
          text-white dark:text-gray-900
          rounded-md shadow-lg
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          pointer-events-none
          whitespace-nowrap
        `}>
          {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          <div className={`
            absolute top-full left-1/2 transform -translate-x-1/2
            w-0 h-0 border-l-4 border-r-4 border-t-4
            border-l-transparent border-r-transparent
            border-t-gray-900 dark:border-t-gray-100
          `} />
        </div>
      </div>
    </div>
  )
}

export default ThemeToggle