import { useState } from 'react';
import { MapPin } from 'lucide-react';

interface GeopoliticalEvent {
  id: string;
  title: string;
  region: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  impact: string;
  coordinates: [number, number];
}

interface Props {
  events: GeopoliticalEvent[];
}

const GeopoliticalMap = ({ events }: Props) => {
  const [selectedEvent, setSelectedEvent] = useState<GeopoliticalEvent | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  // Coordonnées simplifiées pour les régions principales
  const regionCoordinates: { [key: string]: { x: number; y: number } } = {
    'North America': { x: 20, y: 35 },
    Europe: { x: 50, y: 30 },
    'Middle East': { x: 60, y: 45 },
    Asia: { x: 75, y: 40 },
    Global: { x: 45, y: 50 }
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
            <div key={`h-${i}`} className="absolute w-full border-t border-slate-500" style={{ top: `${i * 10}%` }} />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <div key={`v-${i}`} className="absolute h-full border-l border-slate-500" style={{ left: `${i * 10}%` }} />
          ))}
        </div>

        {/* Marqueurs d'événements */}
        {events.map((event) => {
          const coords = regionCoordinates[event.region] || { x: 50, y: 50 };
          return (
            <div
              key={event.id}
              className={`absolute w-4 h-4 rounded-full ${getSeverityColor(event.severity)} animate-pulse cursor-pointer transform -translate-x-2 -translate-y-2 hover:scale-125 transition-transform z-10`}
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
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
            <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-white">
              ✕
            </button>
          </div>
          <p className="text-slate-300 mb-2">{selectedEvent.region}</p>
          <p className="text-amber-400 font-medium">{selectedEvent.impact}</p>
          <div className="mt-2">
            <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getSeverityColor(selectedEvent.severity)}`}>{selectedEvent.severity}</span>
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
              <p className="text-slate-400 text-sm">
                {event.region} • {event.impact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeopoliticalMap;
