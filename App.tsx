import React, { useState } from 'react';
import { Header } from './components/Header';
import { ArticleInput } from './components/ArticleInput';
import { SummaryDisplay } from './components/SummaryDisplay';
import { CategoryExplorer } from './components/CategoryExplorer';
import { generateSummary } from './services/geminiService';
import { AppStatus, SummaryState } from './types';
import { AlertCircle, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<SummaryState>({
    status: AppStatus.IDLE,
    result: null,
    error: null,
  });

  // Track the current topic to update the input field visually if needed, 
  // although mostly we just trigger the search.
  const [currentTopic, setCurrentTopic] = useState('');

  const handleSummarize = async (topic: string) => {
    setCurrentTopic(topic);
    setState({ status: AppStatus.LOADING, result: null, error: null });
    
    try {
      const result = await generateSummary(topic);
      setState({ status: AppStatus.SUCCESS, result, error: null });
    } catch (error: any) {
      setState({ 
        status: AppStatus.ERROR, 
        result: null, 
        error: error.message || "Une erreur inattendue est survenue." 
      });
    }
  };

  const handleReset = () => {
    setState({ status: AppStatus.IDLE, result: null, error: null });
    setCurrentTopic('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px]">
          
          {/* Left Column: Input & Categories (Occupies 5 columns on large screens) */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            <ArticleInput 
              onSummarize={handleSummarize} 
              status={state.status} 
              // Optional: If we wanted to pass the selected topic back to input, we could add a prop here,
              // but for now the Input manages its own internal state unless we force it.
            />
            
            {/* Show categories only when idle or loading, strictly to save space or keep context? 
                Actually, keeping them always visible allows quick switching. */}
            <CategoryExplorer 
              onSelectTopic={handleSummarize} 
              disabled={state.status === AppStatus.LOADING}
            />
          </section>

          {/* Right Column: Output (Occupies 7 columns on large screens) */}
          <section className="lg:col-span-7 h-full min-h-[500px]">
            {state.status === AppStatus.IDLE && (
              <div className="h-full flex flex-col items-center justify-center bg-white/50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <Globe className="w-8 h-8 text-blue-200" />
                </div>
                <h3 className="text-lg font-medium text-gray-500 mb-2">Centre d'Actualités</h3>
                <p className="max-w-xs mx-auto">
                  Sélectionnez une catégorie à gauche ou entrez votre propre sujet pour générer une synthèse en temps réel.
                </p>
              </div>
            )}

            {state.status === AppStatus.LOADING && (
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-4 animate-pulse">
                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {currentTopic ? `Recherche : "${currentTopic}"` : "Recherche en cours..."}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">L'IA consulte plusieurs sources web.</p>
                </div>
              </div>
            )}

            {state.status === AppStatus.ERROR && (
              <div className="h-full flex flex-col items-center justify-center bg-red-50 rounded-xl border border-red-100 p-8 text-center">
                 <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                 <h3 className="text-lg font-bold text-red-800 mb-2">Erreur de recherche</h3>
                 <p className="text-red-600 max-w-sm mb-6">{state.error}</p>
                 <button 
                   onClick={handleReset}
                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                 >
                   Réessayer
                 </button>
              </div>
            )}

            {state.status === AppStatus.SUCCESS && state.result && (
              <SummaryDisplay 
                summary={state.result.text} 
                sources={state.result.sources}
                onClear={handleReset} 
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
