// TODO: replace with API/JSON fetch
import type { EconomicIndicator } from '../types';

export const economicIndicators: EconomicIndicator[] = [
  { id: '1', name: 'US CPI', value: 3.2, change: 0.1, country: 'US', impact: 'high', surprise: 'positive', lastUpdate: '2025-01-13' },
  { id: '2', name: 'EUR Inflation', value: 2.8, change: -0.2, country: 'EU', impact: 'high', surprise: 'negative', lastUpdate: '2025-01-13' },
  { id: '3', name: 'US GDP', value: 2.9, change: 0.3, country: 'US', impact: 'high', surprise: 'positive', lastUpdate: '2025-01-12' },
  { id: '4', name: 'China PMI', value: 50.2, change: 0.5, country: 'CN', impact: 'medium', surprise: 'positive', lastUpdate: '2025-01-13' },
  { id: '5', name: 'US NFP', value: 199000, change: 15000, country: 'US', impact: 'high', surprise: 'neutral', lastUpdate: '2025-01-10' },
  { id: '6', name: 'EUR GDP', value: 1.2, change: -0.1, country: 'EU', impact: 'medium', surprise: 'negative', lastUpdate: '2025-01-11' }
];
