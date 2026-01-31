import React from 'react';
import { Landmark, TrendingUp, Trophy, Smartphone, Leaf, Globe } from 'lucide-react';

interface CategoryExplorerProps {
  onSelectTopic: (topic: string) => void;
  disabled: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  topics: string[];
}

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({ onSelectTopic, disabled }) => {
  const categories: Category[] = [
    {
      id: 'politics',
      name: 'Politique & Société',
      icon: <Landmark className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-700',
      topics: [
        "Situation sécuritaire au Sahel",
        "Élections présidentielles au Sénégal",
        "Sommet de la CEDEAO",
        "Transition politique au Burkina Faso"
      ]
    },
    {
      id: 'economy',
      name: 'Économie',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-emerald-100 text-emerald-700',
      topics: [
        "Cours de l'or et du coton",
        "Inflation zone UEMOA",
        "Zone de libre-échange continentale (ZLECAf)",
        "Projets d'infrastructures en Afrique de l'Ouest"
      ]
    },
    {
      id: 'sport',
      name: 'Sport',
      icon: <Trophy className="w-5 h-5" />,
      color: 'bg-amber-100 text-amber-700',
      topics: [
        "Éliminatoires Coupe du Monde 2026 Afrique",
        "Ligue des Champions CAF",
        "Performance des athlètes africains",
        "Championnat national de football"
      ]
    },
    {
      id: 'tech',
      name: 'Tech & Innovation',
      icon: <Smartphone className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-700',
      topics: [
        "Startups technologiques africaines",
        "Déploiement 5G en Afrique",
        "Intelligence Artificielle au service de l'agriculture",
        "Mobile Money et inclusion financière"
      ]
    }
  ];

  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Explorer par catégorie
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${category.color}`}>
                {category.icon}
              </div>
              <h4 className="font-semibold text-gray-800">{category.name}</h4>
            </div>
            
            <div className="space-y-2">
              {category.topics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectTopic(topic)}
                  disabled={disabled}
                  className="w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded transition-colors truncate"
                >
                  • {topic}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
