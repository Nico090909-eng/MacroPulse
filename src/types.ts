export interface EconomicIndicator {
  id: string;
  name: string;
  value: number;
  change: number;
  country: string;
  impact: 'high' | 'medium' | 'low';
  surprise: 'positive' | 'negative' | 'neutral';
  lastUpdate: string;
}

export interface GeopoliticalEvent {
  id: string;
  title: string;
  region: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  impact: string;
  coordinates: [number, number];
}

export interface MarketAnalysis {
  id: string;
  title: string;
  category: 'inflation' | 'growth' | 'monetary' | 'commodities';
  country: string;
  summary: string;
  impact: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  lastUpdate: string;
}

export interface EconomicCalendarEvent {
  date: string;
  time: string;
  event: string;
  currency: string;
  impact: string;
  actual: string;
  forecast: string;
  previous: string;
}
