import { useState } from 'react';

interface CalendarEvent {
  date: string;
  time: string;
  event: string;
  currency: string;
  impact: string;
  actual: string;
  forecast: string;
  previous: string;
}

interface Props {
  calendar: CalendarEvent[];
}

const CalendarSection = ({ calendar }: Props) => {
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

    return calendar.filter((event) => {
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
      USD: '🇺🇸',
      EUR: '🇪🇺',
      GBP: '🇬🇧',
      JPY: '🇯🇵',
      CNY: '🇨🇳'
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
                selectedWeek === week ? 'bg-amber-400 text-slate-900 font-medium' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {week === 'previous' ? 'Semaine précédente' : week === 'current' ? 'Semaine actuelle' : 'Semaine suivante'}
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
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getImpactColor(event.impact)}`}>{event.impact}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-medium ${getResultColor(event.actual, event.forecast)}`}>{event.actual || '-'}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-300">{event.forecast}</td>
                  <td className="px-4 py-3 text-center text-slate-400">{event.previous}</td>
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

export default CalendarSection;
