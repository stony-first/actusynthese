import React, { useState, useCallback } from 'react';
import { AppStatus, ArticleInputProps } from '../types';
import { Search, Globe, X, ArrowRight } from 'lucide-react';

export const ArticleInput: React.FC<ArticleInputProps> = ({ onSummarize, status }) => {
  const [topic, setTopic] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = useCallback(() => {
    if (topic.trim().length > 0) {
      onSummarize(topic);
    }
  }, [topic, onSummarize]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleClear = useCallback(() => {
    setTopic('');
  }, []);

  const isLoading = status === AppStatus.LOADING;

  return (
    <div className="relative group">
      {/* Decorative gradient blur behind the card */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500 ${isFocused ? 'opacity-50' : ''}`}></div>
      
      <div className="relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300">
        <div className="px-6 py-5 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            Sujet d'actualité
          </h2>
        </div>
        
        <div className="flex-1 p-6 flex flex-col justify-center bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/50">
          <div className={`relative w-full transition-all duration-300 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 transition-colors ${isFocused ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-400 dark:text-slate-500'}`} />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-12 py-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all text-lg font-medium shadow-sm"
              placeholder="Ex: Élections au Sénégal..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
            />
            {topic.length > 0 && !isLoading && (
              <button
                onClick={handleClear}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-gray-500 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <p className="mt-4 text-xs font-medium text-slate-400 dark:text-slate-500 text-center px-4 leading-relaxed">
            Notre IA analyse le web en temps réel pour extraire les faits essentiels.
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-50 dark:border-slate-800 flex justify-end">
          <button
            onClick={handleSearch}
            disabled={isLoading || topic.trim().length < 3}
            className={`
              w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white rounded-lg shadow-md transition-all flex items-center justify-center gap-2
              ${isLoading || topic.trim().length < 3 
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none' 
                : 'bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 active:transform active:scale-95'}
            `}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyse en cours...</span>
              </>
            ) : (
              <>
                <span>Lancer la recherche</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};