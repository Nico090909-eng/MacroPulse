import { useState } from 'react';

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
                onClick={() =>
                  setAlerts(alerts.map((a) => (a.id === alert.id ? { ...a, active: !a.active } : a)))
                }
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  alert.active ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
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

export default AlertsSection;
