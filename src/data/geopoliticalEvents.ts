// TODO: replace with API/JSON fetch
import type { GeopoliticalEvent } from '../types';

export const geopoliticalEvents: GeopoliticalEvent[] = [
  { id: '1', title: 'OPEC+ Production Cut', region: 'Middle East', severity: 'high', impact: 'Oil prices +2%', coordinates: [50, 25] },
  { id: '2', title: 'US-China Trade Talks', region: 'Global', severity: 'medium', impact: 'Markets cautious', coordinates: [116, 39] },
  { id: '3', title: 'ECB Rate Decision', region: 'Europe', severity: 'high', impact: 'EUR volatility expected', coordinates: [8, 50] },
  { id: '4', title: 'Red Sea Tensions', region: 'Middle East', severity: 'critical', impact: 'Shipping disruption', coordinates: [40, 20] }
];
