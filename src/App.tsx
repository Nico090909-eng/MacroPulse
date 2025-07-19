import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Calendar, 
  Bell, 
  BarChart3, 
  Settings, 
  Search,
  DollarSign,
  Zap,
  AlertTriangle,
  Activity,
  MapPin,
  Clock
} from 'lucide-react';

// Types
interface EconomicIndicator {
  id: string;
  name: string;
  value: number;
  change: number;
  country: string;
  impact: 'high' | 'medium' | 'low';
  surprise: 'positive' | 'negative' | 'neutral';
  lastUpdate: string;
}

interface GeopoliticalEvent {
  id: string;
  title: string;
  region: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  impact: string;
  coordinates: [number, number];
}

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

// Mock data
const economicIndicators: EconomicIndicator[] = [
  { id: '1', name: 'US CPI', value: 3.2, change: 0.1, country: 'US', impact: 'high', surprise: 'positive', lastUpdate: '2025-01-13' },
  { id: '2', name: 'EUR Inflation', value: 2.8, change: -0.2, country: 'EU', impact: 'high', surprise: 'negative', lastUpdate: '2025-01-13' },
  { id: '3', name: 'US GDP', value: 2.9, change: 0.3, country: 'US', impact: 'high', surprise: 'positive', lastUpdate: '2025-01-12' },
  { id: '4', name: 'China PMI', value: 50.2, change: 0.5, country: 'CN', impact: 'medium', surprise: 'positive', lastUpdate: '2025-01-13' },
  { id: '5', name: 'US NFP', value: 199000, change: 15000, country: 'US', impact: 'high', surprise: 'neutral', lastUpdate: '2025-01-10' },
  { id: '6', name: 'EUR GDP', value: 1.2, change: -0.1, country: 'EU', impact: 'medium', surprise: 'negative', lastUpdate: '2025-01-11' }
];

const geopoliticalEvents: GeopoliticalEvent[] = [
  { id: '1', title: 'OPEC+ Production Cut', region: 'Middle East', severity: 'high', impact: 'Oil prices +2%', coordinates: [50, 25] },
  { id: '2', title: 'US-China Trade Talks', region: 'Global', severity: 'medium', impact: 'Markets cautious', coordinates: [116, 39] },
  { id: '3', title: 'ECB Rate Decision', region: 'Europe', severity: 'high', impact: 'EUR volatility expected', coordinates: [8, 50] },
  { id: '4', title: 'Red Sea Tensions', region: 'Middle East', severity: 'critical', impact: 'Shipping disruption', coordinates: [40, 20] }
];

const marketAnalyses: MarketAnalysis[] = [
  {
    id: '1',
    title: 'Inflation Plateau Reached',
    category: 'inflation',
    country: 'US',
    summary: 'US CPI shows signs of stabilization around 3.2%',
    impact: 'Fed may pause rate hikes',
    trend: 'neutral',
    lastUpdate: '2025-01-13'
  },
  {
    id: '2',
    title: 'Dollar Strength Persists',
    category: 'monetary',
    country: 'US',
    summary: 'DXY remains elevated on rate differential',
    impact: 'EM currencies under pressure',
    trend: 'bullish',
    lastUpdate: '2025-01-13'
  },
  {
    id: '3',
    title: 'Gold Consolidation Phase',
    category: 'commodities',
    country: 'US',
    summary: 'XAU/USD trading sideways pending Fed clarity',
    impact: 'Breakout above $2100 key',
    trend: 'neutral',
    lastUpdate: '2025-01-12'
  },
  {
    id: '4',
    title: 'ECB Dovish Stance Continues',
    category: 'monetary',
    country: 'EU',
    summary: 'European Central Bank maintains accommodative policy',
    impact: 'EUR weakness expected to persist',
    trend: 'bearish',
    lastUpdate: '2025-01-13'
  },
  {
    id: '5',
    title: 'China Manufacturing Recovery',
    category: 'growth',
    country: 'CN',
    summary: 'PMI data shows gradual improvement in factory activity',
    impact: 'Commodity demand may increase',
    trend: 'bullish',
    lastUpdate: '2025-01-12'
  },
  {
    id: '6',
    title: 'UK Inflation Concerns Mount',
    category: 'inflation',
    country: 'UK',
    summary: 'Core CPI remains stubbornly high despite BoE efforts',
    impact: 'GBP volatility expected',
    trend: 'neutral',
    lastUpdate: '2025-01-11'
  }
];

const upcomingEvents = [
  { date: '2025-01-14', event: 'US Retail Sales', impact: 'High', time: '13:30' },
  { date: '2025-01-15', event: 'ECB Meeting', impact: 'Critical', time: '13:45' },
  { date: '2025-01-16', event: 'China GDP', impact: 'High', time: '02:00' },
  { date: '2025-01-17', event: 'US PPI', impact: 'Medium', time: '13:30' }
];

// Données du calendrier économique détaillé
const economicCalendar = [
  // Semaine précédente (6-12 janvier)
  { 
    date: '2025-01-06', 
    time: '13:30', 
    event: 'US NFP', 
    currency: 'USD', 
    impact: 'High',
    actual: '256K',
    forecast: '160K', 
    previous: '227K'
  },
  { 
    date: '2025-01-07', 
    time: '09:00', 
    event: 'German Factory Orders', 
    currency: 'EUR', 
    impact: 'Medium',
    actual: '0.2%',
    forecast: '0.5%', 
    previous: '-0.5%'
  },
  { 
    date: '2025-01-08', 
    time: '13:30', 
    event: 'US CPI', 
    currency: 'USD', 
    impact: 'High',
    actual: '3.2%',
    forecast: '3.3%', 
    previous: '3.1%'
  },
  { 
    date: '2025-01-09', 
    time: '02:00', 
    event: 'China CPI', 
    currency: 'CNY', 
    impact: 'Medium',
    actual: '1.9%',
    forecast: '2.1%', 
    previous: '1.6%'
  },
  { 
    date: '2025-01-10', 
    time: '13:30', 
    event: 'US PPI', 
    currency: 'USD', 
    impact: 'Medium',
    actual: '3.0%',
    forecast: '2.8%', 
    previous: '2.4%'
  },
  
  // Semaine actuelle (13-19 janvier)
  { 
    date: '2025-01-13', 
    time: '13:30', 
    event: 'US Retail Sales', 
    currency: 'USD', 
    impact: 'High',
    actual: '',
    forecast: '0.6%', 
    previous: '0.7%'
  },
  { 
    date: '2025-01-14', 
    time: '09:00', 
    event: 'EUR GDP', 
    currency: 'EUR', 
    impact: 'High',
    actual: '',
    forecast: '0.9%', 
    previous: '0.4%'
  },
  { 
    date: '2025-01-15', 
    time: '13:45', 
    event: 'ECB Interest Rate', 
    currency: 'EUR', 
    impact: 'High',
    actual: '',
    forecast: '3.25%', 
    previous: '3.25%'
  },
  { 
    date: '2025-01-16', 
    time: '02:00', 
    event: 'China GDP', 
    currency: 'CNY', 
    impact: 'High',
    actual: '',
    forecast: '4.8%', 
    previous: '4.6%'
  },
  { 
    date: '2025-01-17', 
    time: '13:30', 
    event: 'US Housing Starts', 
    currency: 'USD', 
    impact: 'Medium',
    actual: '',
    forecast: '1.35M', 
    previous: '1.29M'
  },
  { 
    date: '2025-01-17', 
    time: '14:15', 
    event: 'US Industrial Production', 
    currency: 'USD', 
    impact: 'Medium',
    actual: '',
    forecast: '0.3%', 
    previous: '0.2%'
  },
  
  // Semaine suivante (20-26 janvier)
  { 
    date: '2025-01-20', 
    time: '13:30', 
    event: 'US Existing Home Sales', 
    currency: 'USD', 
    impact: 'Medium',
    actual: '',
    forecast: '4.15M', 
    previous: '4.15M'
  },
  { 
    date: '2025-01-21', 
    time: '09:30', 
    event: 'UK CPI', 
    currency: 'GBP', 
    impact: 'High',
    actual: '',
    forecast: '2.7%', 
    previous: '2.6%'
  },
  { 
    date: '2025-01-22', 
    time: '13:30', 
    event: 'US Initial Jobless Claims', 
    currency: 'USD', 
    impact: 'Medium',
    actual: '',
    forecast: '220K', 
    previous: '201K'
  },
  { 
    date: '2025-01-23', 
    time: '09:00', 
    event: 'EUR PMI Manufacturing', 
    currency: 'EUR', 
    impact: 'Medium',
    actual: '',
    forecast: '46.1', 
    previous: '46.1'
  },
  { 
    date: '2025-01-24', 
    time: '14:30', 
    event: 'US GDP', 
    currency: 'USD', 
    impact: 'High',
    actual: '',
    forecast: '2.8%', 
    previous: '2.8%'
  },
  { 
    date: '2025-01-24', 
    time: '02:00', 
    event: 'Japan CPI', 
    currency: 'JPY', 
    impact: 'High',
    actual: '',
    forecast: '2.9%', 
    previous: '2.9%'
  }
];

// Components
const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'geopolitics', label: 'Géopolitique', icon: Globe },
    { id: 'analysis', label: 'Analyses', icon: TrendingUp },
    { id: 'calendar', label: 'Calendrier', icon: Calendar },
    { id: 'alerts', label: 'Alertes', icon: Bell },
    { id: 'sentiment', label: 'Sentiment', icon: Activity },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  return (
    <div className="w-64 bg-slate-900 h-full border-r border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Zap className="text-amber-400" size={24} />
          MacroPulse
        </h1>
        <p className="text-slate-400 text-sm mt-1">Hub d'analyse macro</p>
      </div>
      
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
          />
        </div>
      </div>

      <nav className="flex-1 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeTab === item.id
                  ? 'bg-amber-400 text-slate-900 font-medium'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

const IndicatorCard = ({ indicator }: { indicator: EconomicIndicator }) => {
  const getSurpriseColor = (surprise: string) => {
    switch (surprise) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      default: return 'border-green-500';
    }
  };

  return (
    <div className={`bg-slate-800 rounded-lg p-6 border-l-4 ${getImpactColor(indicator.impact)} hover:bg-slate-750 transition-colors cursor-pointer`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-white font-semibold">{indicator.name}</h3>
        <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">
          {indicator.country}
        </span>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl font-bold text-white">{indicator.value}</span>
        <div className={`flex items-center gap-1 ${getSurpriseColor(indicator.surprise)}`}>
          {indicator.change > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="text-sm font-medium">{indicator.change > 0 ? '+' : ''}{indicator.change}</span>
        </div>
      </div>
      
      <div className="text-xs text-slate-400">
        Dernière mise à jour: {indicator.lastUpdate}
      </div>
    </div>
  );
};

const GeopoliticalMap = ({ events }: { events: GeopoliticalEvent[] }) => {
  const [selectedEvent, setSelectedEvent] = useState<GeopoliticalEvent | null>(null);
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  // Coordonnées simplifiées pour les régions principales
  const regionCoordinates: { [key: string]: { x: number; y: number } } = {
    'North America': { x: 20, y: 35 },
    'Europe': { x: 50, y: 30 },
    'Middle East': { x: 60, y: 45 },
    'Asia': { x: 75, y: 40 },
    'Global': { x: 45, y: 50 }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 space-y-6">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <MapPin size={20} />
        Événements Géopolitiques
      </h3>
      
      {/* Carte du monde stylisée */}
      <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg h-80 overflow-hidden border border-slate-600">
        {/* Continents stylisés */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60">
          {/* Amérique du Nord */}
          <path
            d="M5,15 Q15,10 25,15 L30,25 Q25,35 15,30 Q5,25 5,15"
            fill="rgba(71, 85, 105, 0.6)"
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth="0.2"
          />
          {/* Europe */}
          <path
            d="M45,12 Q55,8 60,15 L58,25 Q50,28 45,22 Q42,18 45,12"
            fill="rgba(71, 85, 105, 0.6)"
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth="0.2"
          />
          {/* Asie */}
          <path
            d="M65,10 Q85,8 95,20 L92,35 Q80,40 70,35 Q65,25 65,10"
            fill="rgba(71, 85, 105, 0.6)"
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth="0.2"
          />
          {/* Afrique */}
          <path
            d="M45,25 Q55,22 60,30 L58,45 Q50,50 45,45 Q42,35 45,25"
            fill="rgba(71, 85, 105, 0.6)"
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth="0.2"
          />
          {/* Amérique du Sud */}
          <path
            d="M20,35 Q30,32 35,40 L32,52 Q25,55 20,50 Q18,42 20,35"
            fill="rgba(71, 85, 105, 0.6)"
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth="0.2"
          />
          {/* Océanie */}
          <path
            d="M80,45 Q88,43 92,48 L90,52 Q85,54 80,50 Q78,47 80,45"
            fill="rgba(71, 85, 105, 0.6)"
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth="0.2"
          />
        </svg>
        
        {/* Grille de coordonnées */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full border-t border-slate-500"
              style={{ top: `${i * 10}%` }}
            />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full border-l border-slate-500"
              style={{ left: `${i * 10}%` }}
            />
          ))}
        </div>
        
        {/* Marqueurs d'événements */}
        {events.map((event) => {
          const coords = regionCoordinates[event.region] || { x: 50, y: 50 };
          return (
            <div
              key={event.id}
              className={`absolute w-4 h-4 rounded-full ${getSeverityColor(event.severity)} animate-pulse cursor-pointer transform -translate-x-2 -translate-y-2 hover:scale-125 transition-transform z-10`}
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`
              }}
              onClick={() => setSelectedEvent(event)}
              title={event.title}
            >
              <div className={`absolute inset-0 rounded-full ${getSeverityColor(event.severity)} opacity-30 animate-ping`} />
            </div>
          );
        })}
        
        {/* Légende de la carte */}
        <div className="absolute top-4 right-4 bg-slate-800 bg-opacity-90 rounded-lg p-3 text-xs">
          <h4 className="text-white font-semibold mb-2">Niveaux de sévérité</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-slate-300">Critique</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-slate-300">Élevé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-slate-300">Moyen</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Détail de l'événement sélectionné */}
      {selectedEvent && (
        <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-amber-400">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-white font-semibold">{selectedEvent.title}</h4>
            <button
              onClick={() => setSelectedEvent(null)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-slate-300 mb-2">{selectedEvent.region}</p>
          <p className="text-amber-400 font-medium">{selectedEvent.impact}</p>
          <div className="mt-2">
            <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getSeverityColor(selectedEvent.severity)}`}>
              {selectedEvent.severity}
            </span>
          </div>
        </div>
      )}
      
      {/* Liste des événements */}
      <div className="space-y-2">
        <h4 className="text-white font-medium">Événements récents</h4>
        {events.map((event) => (
          <div
            key={event.id}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
              selectedEvent?.id === event.id ? 'bg-slate-600 border border-amber-400' : 'bg-slate-700 hover:bg-slate-600'
            }`}
            onClick={() => setSelectedEvent(event)}
          >
            <div className={`w-3 h-3 rounded-full ${getSeverityColor(event.severity)}`} />
            <div className="flex-1">
              <h4 className="text-white font-medium">{event.title}</h4>
              <p className="text-slate-400 text-sm">{event.region} • {event.impact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AnalysisCard = ({ analysis }: { analysis: MarketAnalysis }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'inflation': return 'bg-red-500';
      case 'growth': return 'bg-green-500';
      case 'monetary': return 'bg-blue-500';
      case 'commodities': return 'bg-yellow-500';
      default: return 'bg-slate-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish': return <TrendingUp className="text-green-400" size={16} />;
      case 'bearish': return <TrendingDown className="text-red-400" size={16} />;
      default: return <Activity className="text-slate-400" size={16} />;
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

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Dashboard Macroéconomique</h2>
        <div className="flex items-center gap-2 text-slate-400">
          <Clock size={16} />
          <span>Dernière mise à jour: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {economicIndicators.map((indicator) => (
          <IndicatorCard key={indicator.id} indicator={indicator} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Activity size={20} />
            Sentiment Risk On / Risk Off
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Actions Tech (QQQ)</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
                </div>
                <span className="text-green-400 text-sm">80% Risk On</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Obligations (TLT)</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-1/4 h-full bg-red-500 rounded-full"></div>
                </div>
                <span className="text-red-400 text-sm">25% Risk Off</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Dollar (DXY)</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-3/5 h-full bg-yellow-500 rounded-full"></div>
                </div>
                <span className="text-yellow-400 text-sm">60% Neutre</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Or (XAU/USD)</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-red-500 rounded-full"></div>
                </div>
                <span className="text-red-400 text-sm">35% Risk Off</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Crypto (BTC)</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-5/6 h-full bg-green-500 rounded-full"></div>
                </div>
                <span className="text-green-400 text-sm">85% Risk On</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">VIX (Volatilité)</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-1/5 h-full bg-green-500 rounded-full"></div>
                </div>
                <span className="text-green-400 text-sm">20% Faible</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-slate-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">Sentiment Global</h4>
              <span className="text-green-400 font-bold text-lg">RISK ON</span>
            </div>
            <div className="w-full h-3 bg-slate-600 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
            </div>
            <p className="text-slate-300 text-sm mt-2">
              Les marchés montrent un appétit pour le risque avec des flux vers les actifs risqués
            </p>
          </div>
        </div>
        
        <GeopoliticalMap events={geopoliticalEvents} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Événements à venir
          </h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
                <div className="text-center">
                  <div className="text-white font-semibold">{event.date.split('-')[2]}</div>
                  <div className="text-xs text-slate-400">{event.time}</div>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{event.event}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    event.impact === 'Critical' ? 'bg-red-500' :
                    event.impact === 'High' ? 'bg-orange-500' : 'bg-yellow-500'
                  } text-white`}>
                    {event.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalysisSection = () => {
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
  const filteredAnalyses = marketAnalyses.filter(analysis => {
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
                  selectedCategory === category.id
                    ? 'bg-amber-400 text-slate-900 font-medium'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
                  selectedCountry === country.id
                    ? 'bg-blue-500 text-white font-medium'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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

const AlertsSection = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'CPI', threshold: '> 3.5%', active: true },
    { id: 2, type: 'Fed Rate', threshold: 'Change', active: true },
    { id: 3, type: 'Gold', threshold: '> $2100', active: false },
    { id: 4, type: 'DXY', threshold: '< 102', active: true }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Système d'Alertes</h2>
        <button className="bg-amber-400 text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-amber-500 transition-colors">
          Nouvelle alerte
        </button>
      </div>
      
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Alertes actives</h3>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${alert.active ? 'bg-green-500' : 'bg-slate-500'}`} />
                <div>
                  <h4 className="text-white font-medium">{alert.type}</h4>
                  <p className="text-slate-400 text-sm">{alert.threshold}</p>
                </div>
              </div>
              <button
                onClick={() => setAlerts(alerts.map(a => 
                  a.id === alert.id ? { ...a, active: !a.active } : a
                ))}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  alert.active 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                }`}
              >
                {alert.active ? 'Actif' : 'Inactif'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SentimentSection = () => {
  const sentimentData = [
    { name: 'Fear & Greed Index', value: 45, status: 'Neutre' },
    { name: 'VIX', value: 18.5, status: 'Faible' },
    { name: 'Put/Call Ratio', value: 0.95, status: 'Équilibré' },
    { name: 'Retail vs Institutional', value: 65, status: 'Retail dominant' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Sentiment de Marché</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sentimentData.map((item, index) => (
          <div key={index} className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">{item.name}</h3>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white">{item.value}</span>
              <span className="text-amber-400 font-medium">{item.status}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Positionnement COT</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">EUR/USD</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-red-500 rounded-full"></div>
              </div>
              <span className="text-red-400 text-sm">75% Short</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Gold</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-green-500 rounded-full"></div>
              </div>
              <span className="text-green-400 text-sm">67% Long</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarSection = () => {
  const [selectedWeek, setSelectedWeek] = useState<'previous' | 'current' | 'next'>('current');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  
  const countries = [
    { id: 'all', label: 'Tous les pays' },
    { id: 'USD', label: '🇺🇸 États-Unis' },
    { id: 'EUR', label: '🇪🇺 Zone Euro' },
    { id: 'GBP', label: '🇬🇧 Royaume-Uni' },
    { id: 'JPY', label: '🇯🇵 Japon' },
    { id: 'CNY', label: '🇨🇳 Chine' },
    { id: 'CAD', label: '🇨🇦 Canada' }
  ];
  
  const getWeekData = (week: 'previous' | 'current' | 'next') => {
    const today = new Date();
    const currentWeekStart = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    
    let weekStart: Date;
    switch (week) {
      case 'previous':
        weekStart = new Date(currentWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'next':
        weekStart = new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      default:
        weekStart = currentWeekStart;
    }
    
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
    
    return economicCalendar.filter(event => {
      const eventDate = new Date(event.date);
      const dateMatch = eventDate >= weekStart && eventDate <= weekEnd;
      const countryMatch = selectedCountry === 'all' || event.currency === selectedCountry;
      return dateMatch && countryMatch;
    });
  };

  const getImpactColor = (impact: string) => {
    return impact === 'High' ? 'bg-red-500' : 'bg-yellow-500';
  };

  const getResultColor = (actual: string, forecast: string) => {
    if (!actual || !forecast) return 'text-slate-400';
    
    const actualNum = parseFloat(actual.replace(/[^\d.-]/g, ''));
    const forecastNum = parseFloat(forecast.replace(/[^\d.-]/g, ''));
    
    if (actualNum > forecastNum) return 'text-green-400';
    if (actualNum < forecastNum) return 'text-red-400';
    return 'text-slate-400';
  };

  const getCurrencyFlag = (currency: string) => {
    const flags: { [key: string]: string } = {
      'USD': '🇺🇸',
      'EUR': '🇪🇺', 
      'GBP': '🇬🇧',
      'JPY': '🇯🇵',
      'CNY': '🇨🇳'
    };
    return flags[currency] || '🏳️';
  };

  const weekData = getWeekData(selectedWeek);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Calendrier Économique</h2>
        <div className="flex gap-2">
          {(['previous', 'current', 'next'] as const).map((week) => (
            <button
              key={week}
              onClick={() => setSelectedWeek(week)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedWeek === week
                  ? 'bg-amber-400 text-slate-900 font-medium'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {week === 'previous' ? 'Semaine précédente' : 
               week === 'current' ? 'Semaine actuelle' : 
               'Semaine suivante'}
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
                selectedCountry === country.id
                  ? 'bg-blue-500 text-white font-medium'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {country.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-white font-semibold">Date & Heure</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Événement</th>
                <th className="px-4 py-3 text-center text-white font-semibold">Devise</th>
                <th className="px-4 py-3 text-center text-white font-semibold">Impact</th>
                <th className="px-4 py-3 text-center text-white font-semibold">Actual</th>
                <th className="px-4 py-3 text-center text-white font-semibold">Forecast</th>
                <th className="px-4 py-3 text-center text-white font-semibold">Previous</th>
              </tr>
            </thead>
            <tbody>
              {weekData.map((event, index) => (
                <tr key={index} className="border-t border-slate-700 hover:bg-slate-750 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-white font-medium">
                      {new Date(event.date).toLocaleDateString('fr-FR', { 
                        weekday: 'short', 
                        day: '2-digit', 
                        month: 'short' 
                      })}
                    </div>
                    <div className="text-slate-400 text-sm">{event.time}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-white font-medium">{event.event}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg">{getCurrencyFlag(event.currency)}</span>
                      <span className="text-white font-medium">{event.currency}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getImpactColor(event.impact)}`}>
                      {event.impact}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-medium ${getResultColor(event.actual, event.forecast)}`}>
                      {event.actual || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-300">
                    {event.forecast}
                  </td>
                  <td className="px-4 py-3 text-center text-slate-400">
                    {event.previous}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Légende</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-slate-300">Impact élevé</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-slate-300">Impact moyen</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">●</span>
            <span className="text-slate-300">Résultat supérieur aux attentes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-400">●</span>
            <span className="text-slate-300">Résultat inférieur aux attentes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'geopolitics':
        return <GeopoliticalMap events={geopoliticalEvents} />;
      case 'analysis':
        return <AnalysisSection />;
      case 'calendar':
        return <CalendarSection />;
      case 'alerts':
        return <AlertsSection />;
      case 'sentiment':
        return <SentimentSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;