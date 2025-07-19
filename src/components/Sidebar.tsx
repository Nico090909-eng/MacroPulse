import { BarChart3, Globe, TrendingUp, Calendar, Bell, Activity, Settings, Search, Zap } from 'lucide-react';
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
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

export default Sidebar;
