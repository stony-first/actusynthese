import React, { useState, useCallback } from 'react';
import { AppStatus, ArticleInputProps } from '../types';
import { Search, Globe, X } from 'lucide-react';

export const ArticleInput: React.FC<ArticleInputProps> = ({ onSummarize, status }) => {
  const [topic, setTopic] = useState('');

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
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-blue-50/30">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Sujet d'actualité
        </h2>
      </div>
      
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
            placeholder="Ex: Élections au Sénégal, Finale de la CAN..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          {topic.length > 0 && !isLoading && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <p className="mt-4 text-sm text-gray-500 text-center">
          L'IA va rechercher les informations les plus récentes sur le web pour construire votre synthèse.
        </p>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
        <button
          onClick={handleSearch}
          disabled={isLoading || topic.trim().length < 3}
          className={`
            w-full sm:w-auto px-6 py-3 text-base font-semibold text-white rounded-lg shadow-sm transition-all flex items-center justify-center gap-2
            ${isLoading || topic.trim().length < 3 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-95'}
          `}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Recherche en cours...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Lancer la recherche</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
