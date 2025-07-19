import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import GeopoliticalMap from './components/GeopoliticalMap';
import AnalysisSection from './components/AnalysisSection';
import CalendarSection from './components/CalendarSection';
import AlertsSection from './components/AlertsSection';
import SentimentSection from './components/SentimentSection';

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

const economicCalendar = [
  { date: '2025-01-06', time: '13:30', event: 'US NFP', currency: 'USD', impact: 'High', actual: '256K', forecast: '160K', previous: '227K' },
  { date: '2025-01-07', time: '09:00', event: 'German Factory Orders', currency: 'EUR', impact: 'Medium', actual: '0.2%', forecast: '0.5%', previous: '-0.5%' },
  { date: '2025-01-08', time: '13:30', event: 'US CPI', currency: 'USD', impact: 'High', actual: '3.2%', forecast: '3.3%', previous: '3.1%' },
  { date: '2025-01-09', time: '02:00', event: 'China CPI', currency: 'CNY', impact: 'Medium', actual: '1.9%', forecast: '2.1%', previous: '1.6%' },
  { date: '2025-01-10', time: '13:30', event: 'US PPI', currency: 'USD', impact: 'Medium', actual: '3.0%', forecast: '2.8%', previous: '2.4%' },
  { date: '2025-01-13', time: '13:30', event: 'US Retail Sales', currency: 'USD', impact: 'High', actual: '', forecast: '0.6%', previous: '0.7%' },
  { date: '2025-01-14', time: '09:00', event: 'EUR GDP', currency: 'EUR', impact: 'High', actual: '', forecast: '0.9%', previous: '0.4%' },
  { date: '2025-01-15', time: '13:45', event: 'ECB Interest Rate', currency: 'EUR', impact: 'High', actual: '', forecast: '3.25%', previous: '3.25%' },
  { date: '2025-01-16', time: '02:00', event: 'China GDP', currency: 'CNY', impact: 'High', actual: '', forecast: '4.8%', previous: '4.6%' },
  { date: '2025-01-17', time: '13:30', event: 'US Housing Starts', currency: 'USD', impact: 'Medium', actual: '', forecast: '1.35M', previous: '1.29M' },
  { date: '2025-01-17', time: '14:15', event: 'US Industrial Production', currency: 'USD', impact: 'Medium', actual: '', forecast: '0.3%', previous: '0.2%' },
  { date: '2025-01-20', time: '13:30', event: 'US Existing Home Sales', currency: 'USD', impact: 'Medium', actual: '', forecast: '4.15M', previous: '4.15M' },
  { date: '2025-01-21', time: '09:30', event: 'UK CPI', currency: 'GBP', impact: 'High', actual: '', forecast: '2.7%', previous: '2.6%' },
  { date: '2025-01-22', time: '13:30', event: 'US Initial Jobless Claims', currency: 'USD', impact: 'Medium', actual: '', forecast: '220K', previous: '201K' },
  { date: '2025-01-23', time: '09:00', event: 'EUR PMI Manufacturing', currency: 'EUR', impact: 'Medium', actual: '', forecast: '46.1', previous: '46.1' },
  { date: '2025-01-24', time: '14:30', event: 'US GDP', currency: 'USD', impact: 'High', actual: '', forecast: '2.8%', previous: '2.8%' },
  { date: '2025-01-24', time: '02:00', event: 'Japan CPI', currency: 'JPY', impact: 'High', actual: '', forecast: '2.9%', previous: '2.9%' }
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard indicators={economicIndicators} geoEvents={geopoliticalEvents} upcoming={upcomingEvents} />;
      case 'geopolitics':
        return <GeopoliticalMap events={geopoliticalEvents} />;
      case 'analysis':
        return <AnalysisSection analyses={marketAnalyses} />;
      case 'calendar':
        return <CalendarSection calendar={economicCalendar} />;
      case 'alerts':
        return <AlertsSection />;
      case 'sentiment':
        return <SentimentSection />;
      default:
        return <Dashboard indicators={economicIndicators} geoEvents={geopoliticalEvents} upcoming={upcomingEvents} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{renderContent()}</div>
      </main>
    </div>
  );
}

export default App;
