import { useState } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MarketAnalysis {
  id: string;
  title: string;
  category: 'inflation' | 'growth' | 'monetary' | 'commodities';
  country: string;
  summary: string;
  impact: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  lastUpdate: string;
}

interface Props {
  analyses: MarketAnalysis[];
}

const AnalysisCard = ({ analysis }: { analysis: MarketAnalysis }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'inflation':
        return 'bg-red-500';
      case 'growth':
        return 'bg-green-500';
      case 'monetary':
        return 'bg-blue-500';
      case 'commodities':
        return 'bg-yellow-500';
      default:
        return 'bg-slate-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish':
        return <TrendingUp className="text-green-400" size={16} />;
      case 'bearish':
        return <TrendingDown className="text-red-400" size={16} />;
      default:
        return <Activity className="text-slate-400" size={16} />;
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-white font-semibold">{analysis.title}</h3>
        <div className="flex items-center gap-2">
          {getTrendIcon(analysis.trend)}
          <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(analysis.category)} text-white`}>
            {analysis.category}
          </span>
        </div>
      </div>

      <p className="text-slate-300 mb-3">{analysis.summary}</p>

      <div className="border-t border-slate-700 pt-3">
        <p className="text-amber-400 font-medium mb-2">Impact: {analysis.impact}</p>
        <p className="text-xs text-slate-400">Mis à jour: {analysis.lastUpdate}</p>
      </div>
    </div>
  );
};

const AnalysisSection = ({ analyses }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Toutes' },
    { id: 'inflation', label: 'Inflation' },
    { id: 'growth', label: 'Croissance' },
    { id: 'monetary', label: 'Monétaire' },
    { id: 'commodities', label: 'Matières premières' }
  ];

  const countries = [
    { id: 'all', label: 'Tous les pays' },
    { id: 'US', label: '🇺🇸 États-Unis' },
    { id: 'EU', label: '🇪🇺 Zone Euro' },
    { id: 'CN', label: '🇨🇳 Chine' },
    { id: 'JP', label: '🇯🇵 Japon' },
    { id: 'UK', label: '🇬🇧 Royaume-Uni' },
    { id: 'CA', label: '🇨🇦 Canada' }
  ];

  const filteredAnalyses = analyses.filter((analysis) => {
    const categoryMatch = selectedCategory === 'all' || analysis.category === selectedCategory;
    const countryMatch = selectedCountry === 'all' || analysis.country === selectedCountry;
    return categoryMatch && countryMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Analyses Fondamentales</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-white font-medium mb-2">Filtrer par catégorie</h3>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id ? 'bg-amber-400 text-slate-900 font-medium' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-medium mb-2">Filtrer par pays</h3>
          <div className="flex gap-2 flex-wrap">
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => setSelectedCountry(country.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCountry === country.id ? 'bg-blue-500 text-white font-medium' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {country.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAnalyses.map((analysis) => (
          <AnalysisCard key={analysis.id} analysis={analysis} />
        ))}
      </div>
    </div>
  );
};

export default AnalysisSection;
