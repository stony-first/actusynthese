import React, { useState } from 'react';
import { Sparkles, MapPin, Globe, Shield, Trophy, LayoutGrid, ImageOff } from 'lucide-react';

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
  sectionIcon: React.ReactNode;
  items: TopicCard[];
}

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({ onSelectTopic, disabled }) => {
  // Simple state to track images that fail to load
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});

  const handleImageError = (imgUrl: string) => {
    setErrorImages(prev => ({ ...prev, [imgUrl]: true }));
  };

  const categories: CategorySection[] = [
    {
      id: 'burkina',
      title: 'Burkina Faso',
      sectionIcon: <MapPin className="w-4 h-4 text-red-500" />,
      items: [
        {
          label: "Politique & Transition",
          query: "Actualités sur la transition politique et le gouvernement au Burkina Faso",
          // Image: Microphones/Press Conference
          image: "https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=800&q=80"
        },
        {
          label: "Économie Locale",
          query: "Situation économique, marché et agriculture au Burkina Faso",
          // Image: African Market/Economy
          image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=800&q=80" 
        },
        {
          label: "Société & Culture",
          query: "Société civile, culture et événements au Burkina Faso",
          // Image: Crowd/Community
          image: "https://images.unsplash.com/photo-1496317506642-4850b6750d77?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: 'aes',
      title: 'AES & Sahel',
      sectionIcon: <Shield className="w-4 h-4 text-amber-500" />,
      items: [
        {
          label: "Alliance des États du Sahel",
          query: "Dernières actualités et décisions de l'AES (Mali, Burkina, Niger)",
          // Image: Flags/Official meeting vibe
          image: "https://images.unsplash.com/photo-1556489396-88a53e6d1ccb?auto=format&fit=crop&w=800&q=80"
        },
        {
          label: "Sécurité & Défense",
          query: "Opérations de sécurisation et lutte contre le terrorisme au Sahel",
          // Image: Military texture/Security
          image: "https://images.unsplash.com/photo-1596525737233-a447101f3f4c?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: 'afrique',
      title: 'Pan-Afrique',
      sectionIcon: <LayoutGrid className="w-4 h-4 text-emerald-500" />,
      items: [
        {
          label: "Diplomatie Africaine",
          query: "Actualités de l'Union Africaine et CEDEAO",
          // Image: International flags
          image: "https://images.unsplash.com/photo-1529101091760-61df6be34fc8?auto=format&fit=crop&w=800&q=80"
        },
        {
          label: "Développement",
          query: "Grands projets d'infrastructures et développement en Afrique de l'Ouest",
          // Image: Construction/Infrastructure
          image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: 'monde',
      title: 'International',
      sectionIcon: <Globe className="w-4 h-4 text-blue-500" />,
      items: [
        {
          label: "Géopolitique Mondiale",
          query: "Grands titres de l'actualité internationale : conflits et alliances",
          // Image: Globe/News
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
        },
        {
          label: "Tech & Futur",
          query: "Innovations technologiques, IA et sciences",
          // Image: Technology
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: 'sport',
      title: 'Sports',
      sectionIcon: <Trophy className="w-4 h-4 text-yellow-500" />,
      items: [
        {
          label: "Football & CAN",
          query: "Actualités du football africain et équipes nationales",
          // Image: Soccer stadium
          image: "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&w=800&q=80"
        },
        {
          label: "Sports de Combat",
          query: "Actualités MMA, Boxe et Lutte africaine",
          // Image: Boxing/Combat
          image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
  ];

  return (
    <div className="mt-10 animate-in fade-in duration-700">
      <div className="flex items-center gap-2 mb-6 px-1">
        <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          À la une des catégories
        </h3>
      </div>

      <div className="space-y-8">
        {categories.map((section) => (
          <div key={section.id}>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                {section.sectionIcon}
              </div>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                {section.title}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item, idx) => {
                const hasError = errorImages[item.image];
                
                return (
                  <button
                    key={idx}
                    onClick={() => onSelectTopic(item.query)}
                    disabled={disabled}
                    className="group relative h-36 w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 text-left"
                  >
                    {/* Image Container */}
                    <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800">
                      {!hasError ? (
                        <img 
                          src={item.image} 
                          alt={item.label}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 dark:opacity-75"
                          onError={() => handleImageError(item.image)}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600">
                          <ImageOff className="w-8 h-8" />
                        </div>
                      )}
                      
                      {/* Gradient Overlay - Crucial for text readability on real photos */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                      <h5 className="text-white font-bold text-base leading-tight drop-shadow-md group-hover:text-indigo-200 transition-colors">
                        {item.label}
                      </h5>
                    </div>

                    {/* Hover Effect Highlight */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-400/50 rounded-xl transition-colors pointer-events-none" />

                    {/* Loading State Overlay */}
                    {disabled && (
                      <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[1px] cursor-not-allowed flex items-center justify-center z-20">
                        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};