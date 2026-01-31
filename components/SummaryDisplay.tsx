import React, { useState } from 'react';
import { SummaryDisplayProps } from '../types';
import { Copy, Check, RefreshCw, Bookmark, ExternalLink } from 'lucide-react';

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary, sources, onClear, isStreaming }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/40 dark:shadow-black/40 border border-slate-100 dark:border-slate-800 overflow-hidden relative transition-colors duration-300">
      {/* Top Accent Line */}
      <div className={`h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full absolute top-0 left-0 ${isStreaming ? 'animate-pulse' : ''}`}></div>

      <div className="px-8 py-6 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 mt-1">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-serif flex items-center gap-3">
          Synthèse
          {isStreaming ? (
            <span className="text-xs font-sans font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-full border border-indigo-100 dark:border-indigo-800 animate-pulse">
              En rédaction...
            </span>
          ) : (
            <span className="text-xs font-sans font-normal text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-full border border-slate-100 dark:border-slate-700">
              Généré par IA
            </span>
          )}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            disabled={isStreaming}
            className={`p-2 rounded-lg transition-all duration-200 ${copied ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 disabled:opacity-50 disabled:cursor-not-allowed'}`}
            title="Copier le texte"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-8 sm:p-10 overflow-y-auto bg-white dark:bg-slate-900 custom-scrollbar">
        <article className="prose prose-slate dark:prose-invert max-w-none mb-10">
          <p className="text-slate-800 dark:text-slate-200 text-lg sm:text-xl leading-8 font-serif whitespace-pre-wrap antialiased">
            {summary}
            {isStreaming && (
              <span className="inline-block w-2 h-5 ml-1 bg-indigo-600 dark:bg-indigo-400 animate-pulse align-middle rounded-sm"></span>
            )}
          </p>
        </article>

        {sources && sources.length > 0 && (
          <div className="relative animate-in fade-in duration-500">
            <div className="absolute -top-4 left-0 text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest bg-white dark:bg-slate-900 pr-2">
              Sources vérifiées
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sources.map((source, index) => (
                <a
                  key={index}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:border-indigo-100 dark:group-hover:border-indigo-800 transition-colors">
                    <ExternalLink className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate group-hover:text-indigo-700 dark:group-hover:text-indigo-400 font-sans">
                      {source.title}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                      {new URL(source.uri).hostname}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <button
          onClick={onClear}
          disabled={isStreaming}
          className={`px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 bg-transparent border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm rounded-lg transition-all flex items-center gap-2 ${isStreaming ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <RefreshCw className="w-4 h-4" />
          Nouvelle recherche
        </button>
      </div>
    </div>
  );
};