import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ArticleInput } from './components/ArticleInput';
import { SummaryDisplay } from './components/SummaryDisplay';
import { CategoryExplorer } from './components/CategoryExplorer';
import { streamSummary } from './services/geminiService';
import { AppStatus, SummaryState } from './types';
import { AlertCircle, FileText, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<SummaryState>({
    status: AppStatus.IDLE,
    result: null,
    error: null,
  });

  const [currentTopic, setCurrentTopic] = useState('');
  
  // Theme state initialization
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      // Default to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Apply theme class to html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSummarize = async (topic: string) => {
    setCurrentTopic(topic);
    // Switch to LOADING first
    setState({ status: AppStatus.LOADING, result: null, error: null });
    
    try {
      const stream = streamSummary(topic);
      
      // Iterate over the stream
      for await (const update of stream) {
        setState({ 
          status: AppStatus.STREAMING, // Switch to STREAMING as soon as we have data
          result: update, 
          error: null 
        });
      }

      // Mark as SUCCESS when done
      setState(prev => ({ 
        ...prev, 
        status: AppStatus.SUCCESS 
      }));

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

  // Helper to determine if we should show the results view
  const showResults = state.status === AppStatus.SUCCESS || state.status === AppStatus.STREAMING;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 pb-12 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* Show Hero/Categories when NOT showing results (Idle, Loading, Error) */}
        {!showResults && (
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
             
             {/* Left Column: Input */}
             <section className="lg:col-span-5 flex flex-col gap-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                    L'actualité, <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                      synthétisée pour vous.
                    </span>
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                    Obtenez des résumés journalistiques neutres et sourcés en quelques secondes grâce à l'IA.
                  </p>
                </div>
               
               <ArticleInput 
                 onSummarize={handleSummarize} 
                 status={state.status} 
               />
               
               <CategoryExplorer 
                 onSelectTopic={handleSummarize} 
                 disabled={state.status === AppStatus.LOADING}
               />
             </section>

             {/* Right Column: Placeholders or Loading */}
             <section className="lg:col-span-7 min-h-[400px]">
               {(state.status === AppStatus.IDLE || state.status === AppStatus.ERROR) && state.status !== AppStatus.LOADING && (
                 <div className="h-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-8 text-center opacity-70">
                   {state.status === AppStatus.ERROR ? (
                     <>
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full mb-4">
                          <AlertCircle className="w-10 h-10 text-red-500 dark:text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Erreur de traitement</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">{state.error}</p>
                        <button 
                          onClick={handleReset}
                          className="px-6 py-3 bg-slate-900 dark:bg-indigo-600 text-white font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors shadow-lg shadow-slate-900/10 dark:shadow-indigo-500/20"
                        >
                          Essayer un autre sujet
                        </button>
                     </>
                   ) : (
                     <>
                       <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm mb-6 border border-slate-100 dark:border-slate-700">
                         <FileText className="w-12 h-12 text-slate-200 dark:text-slate-600" />
                       </div>
                       <h3 className="text-lg font-bold text-slate-400 dark:text-slate-500 mb-2">Espace de lecture</h3>
                       <p className="max-w-xs mx-auto text-slate-400 dark:text-slate-500 text-sm">
                         Votre synthèse s'affichera ici une fois la recherche terminée.
                       </p>
                     </>
                   )}
                 </div>
               )}

               {state.status === AppStatus.LOADING && (
                 <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-slate-800 p-12 space-y-6 animate-pulse">
                   <div className="w-16 h-16 border-4 border-indigo-100 dark:border-slate-700 border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-spin"></div>
                   <div className="text-center">
                     <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                       Initialisation
                     </h3>
                     <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-2">"{currentTopic}"</p>
                     <p className="text-slate-400 dark:text-slate-500 text-sm mt-4">Connexion aux flux d'actualités...</p>
                   </div>
                 </div>
               )}
             </section>
           </div>
        )}

        {/* Full width view for results to focus reading - Shows during STREAMING and SUCCESS */}
        {showResults && state.result && (
           <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500">
             <button 
               onClick={handleReset}
               className="mb-6 flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
             >
               <div className="p-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mr-2 group-hover:border-indigo-200 dark:group-hover:border-indigo-800">
                <ArrowLeft className="w-4 h-4" />
               </div>
               Retour à la recherche
             </button>
             
             <SummaryDisplay 
               summary={state.result.text} 
               sources={state.result.sources}
               onClear={handleReset} 
               isStreaming={state.status === AppStatus.STREAMING}
             />
           </div>
        )}

      </main>
    </div>
  );
};

export default App;