import { Activity, Calendar, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import GeopoliticalMap from './GeopoliticalMap';

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

interface UpcomingEvent {
  date: string;
  event: string;
  impact: string;
  time: string;
}

interface DashboardProps {
  indicators: EconomicIndicator[];
  geoEvents: GeopoliticalEvent[];
  upcoming: UpcomingEvent[];
}

const IndicatorCard = ({ indicator }: { indicator: EconomicIndicator }) => {
  const getSurpriseColor = (surprise: string) => {
    switch (surprise) {
      case 'positive':
        return 'text-green-400';
      case 'negative':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'border-red-500';
      case 'medium':
        return 'border-yellow-500';
      default:
        return 'border-green-500';
    }
  };

  return (
    <div
      className={`bg-slate-800 rounded-lg p-6 border-l-4 ${getImpactColor(
        indicator.impact
      )} hover:bg-slate-750 transition-colors cursor-pointer`}
    >
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
          <span className="text-sm font-medium">
            {indicator.change > 0 ? '+' : ''}
            {indicator.change}
          </span>
        </div>
      </div>

      <div className="text-xs text-slate-400">Dernière mise à jour: {indicator.lastUpdate}</div>
    </div>
  );
};

const Dashboard = ({ indicators, geoEvents, upcoming }: DashboardProps) => {
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
        {indicators.map((indicator) => (
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

        <GeopoliticalMap events={geoEvents} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Événements à venir
          </h3>
          <div className="space-y-3">
            {upcoming.map((event, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
                <div className="text-center">
                  <div className="text-white font-semibold">{event.date.split('-')[2]}</div>
                  <div className="text-xs text-slate-400">{event.time}</div>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{event.event}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      event.impact === 'Critical'
                        ? 'bg-red-500'
                        : event.impact === 'High'
                        ? 'bg-orange-500'
                        : 'bg-yellow-500'
                    } text-white`}
                  >
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

export default Dashboard;
