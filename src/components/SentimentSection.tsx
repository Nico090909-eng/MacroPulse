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

export default SentimentSection;
