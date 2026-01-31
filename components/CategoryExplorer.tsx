import React from 'react';
import { Sparkles, MapPin, Globe, Shield, Trophy, LayoutGrid } from 'lucide-react';

interface CategoryExplorerProps {
  onSelectTopic: (topic: string) => void;
  disabled: boolean;
}

interface TopicCard {
  label: string;
  query: string;
  image: string;
}

interface CategorySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: TopicCard[];
}

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({ onSelectTopic, disabled }) => {
  
  const categories: CategorySection[] = [
    {
      id: 'burkina',
      title: 'Burkina Faso',
      icon: <MapPin className="w-4 h-4 text-red-500" />,
      items: [
        {
          label: "Transition Politique",
          query: "Actualités sur la transition politique au Burkina Faso",
          image: "https://images.unsplash.com/photo-1590624747738-9e5c43d7072e?auto=format&fit=crop&w=600&q=80"
        },
        {
          label: "Économie & Développement",
          query: "Situation économique et projets de développement au Burkina Faso",
          image: "https://images.unsplash.com/photo-1605634688173-9a4c0a5a3a44?auto=format&fit=crop&w=600&q=80"
        },
        {
          label: "Culture & FESPACO",
          query: "Actualités culturelles et cinéma au Burkina Faso",
          image: "https://images.unsplash.com/photo-1542352658-0d04f1412030?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: 'aes',
      title: 'AES & Sahel',
      icon: <Shield className="w-4 h-4 text-amber-500" />,
      items: [
        {
          label: "Coopération AES",
          query: "Dernières actualités de l'Alliance des États du Sahel (AES)",
          image: "https://images.unsplash.com/photo-1628136817812-706d863f6498?auto=format&fit=crop&w=600&q=80"
        },
        {
          label: "Sécurité Régionale",
          query: "Situation sécuritaire et lutte contre le terrorisme au Sahel",
          image: "https://images.unsplash.com/photo-1555541604-5e921828303f?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: 'afrique',
      title: 'Afrique',
      icon: <LayoutGrid className="w-4 h-4 text-emerald-500" />,
      items: [
        {
          label: "Diplomatie UA",
          query: "Actualités Union Africaine et diplomatie continentale",
          image: "https://images.unsplash.com/photo-1521996537380-60293d56f688?auto=format&fit=crop&w=600&q=80"
        },
        {
          label: "Élections en Afrique",
          query: "Dernières élections présidentielles en Afrique de l'Ouest",
          image: "https://images.unsplash.com/photo-1541872703-74c59636a004?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: 'monde',
      title: 'Infos Mondial',
      icon: <Globe className="w-4 h-4 text-blue-500" />,
      items: [
        {
          label: "Géopolitique",
          query: "Grands titres de l'actualité internationale aujourd'hui",
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
        },
        {
          label: "Tech & Innovation",
          query: "Dernières innovations technologiques et IA dans le monde",
          image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: 'sport',
      title: 'Sport',
      icon: <Trophy className="w-4 h-4 text-yellow-500" />,
      items: [
        {
          label: "Football Africain",
          query: "Actualités football CAN et compétitions africaines",
          image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80"
        },
        {
          label: "Sports Internationaux",
          query: "Résumés des grands événements sportifs mondiaux",
          image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80"
        }
      ]
    }
  ];

  return (
    <div className="mt-10 animate-in fade-in duration-700">
      <div className="flex items-center gap-2 mb-6 px-1">
        <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Suggestions par catégorie
        </h3>
      </div>

      <div className="space-y-8">
        {categories.map((section) => (
          <div key={section.id}>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                {section.icon}
              </div>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                {section.title}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectTopic(item.query)}
                  disabled={disabled}
                  className="group relative h-32 w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 text-left"
                >
                  {/* Background Image with Zoom Effect */}
                  <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800">
                    <img 
                      src={item.image} 
                      alt={item.label}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-100 dark:opacity-80"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <span className="text-white font-bold text-sm drop-shadow-md group-hover:text-indigo-200 transition-colors">
                      {item.label}
                    </span>
                  </div>

                  {/* Loading State Overlay */}
                  {disabled && (
                    <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[1px] cursor-not-allowed flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};