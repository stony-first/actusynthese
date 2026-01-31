import React from 'react';
import { Newspaper, Sparkles, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-800/50 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-slate-900 dark:bg-indigo-600 p-2 rounded-xl shadow-lg shadow-slate-900/10 dark:shadow-indigo-900/20 transition-all group-hover:scale-105">
              <Newspaper className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                Stony <span className="text-indigo-600 dark:text-indigo-400">ActuSynthèse</span>
              </h1>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                Journalisme IA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Changer le thème"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 shadow-sm">
              <Sparkles className="h-3 w-3 text-indigo-500 dark:text-indigo-400" />
              <span>Propulsé par Gemini Flash</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};