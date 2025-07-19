import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import GeopoliticalMap from './components/GeopoliticalMap';
import AnalysisSection from './components/AnalysisSection';
import CalendarSection from './components/CalendarSection';
import AlertsSection from './components/AlertsSection';
import SentimentSection from './components/SentimentSection';
import { economicIndicators } from './data/economicIndicators';
import { geopoliticalEvents } from './data/geopoliticalEvents';
import { marketAnalyses } from './data/marketAnalyses';
import { economicCalendar } from './data/economicCalendar';

const upcomingEvents = [
  { date: '2025-01-14', event: 'US Retail Sales', impact: 'High', time: '13:30' },
  { date: '2025-01-15', event: 'ECB Meeting', impact: 'Critical', time: '13:45' },
  { date: '2025-01-16', event: 'China GDP', impact: 'High', time: '02:00' },
  { date: '2025-01-17', event: 'US PPI', impact: 'Medium', time: '13:30' }
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            indicators={economicIndicators}
            geoEvents={geopoliticalEvents}
            upcoming={upcomingEvents}
          />
        );
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
        return (
          <Dashboard
            indicators={economicIndicators}
            geoEvents={geopoliticalEvents}
            upcoming={upcomingEvents}
          />
        );
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
