import React from 'react';
import { Newspaper, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Newspaper className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                Actu<span className="text-blue-600">Synthèse</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium">Assistant Journalistique AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
            <Zap className="h-4 w-4 text-amber-500 fill-current" />
            <span className="hidden sm:inline">Propulsé par Gemini</span>
          </div>
        </div>
      </div>
    </header>
  );
};
