import React, { useState } from 'react';
import { SummaryDisplayProps } from '../types';
import { Copy, Check, RefreshCw, Feather, ExternalLink } from 'lucide-react';

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary, sources, onClear }) => {
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
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ring-1 ring-blue-50">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
          <Feather className="w-5 h-5 text-blue-600" />
          Synthèse Web
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Copier le texte"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
        <div className="prose prose-blue max-w-none mb-8">
          <p className="text-gray-800 text-lg leading-8 font-medium font-serif whitespace-pre-wrap">
            {summary}
          </p>
        </div>

        {sources && sources.length > 0 && (
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Sources utilisées
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {sources.map((source, index) => (
                <a
                  key={index}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-100 transition-colors group"
                >
                  <div className="p-1.5 bg-white rounded-md border border-gray-200 text-blue-600 group-hover:border-blue-200">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-700">
                      {source.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {new URL(source.uri).hostname}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
        <button
          onClick={onClear}
          className="px-4 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Nouvelle recherche
        </button>
      </div>
    </div>
  );
};
