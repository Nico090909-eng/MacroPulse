// TODO: replace with API/JSON fetch
import type { MarketAnalysis } from '../types';

export const marketAnalyses: MarketAnalysis[] = [
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
