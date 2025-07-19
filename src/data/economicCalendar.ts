// TODO: replace with API/JSON fetch
import type { EconomicCalendarEvent } from '../types';

export const economicCalendar: EconomicCalendarEvent[] = [
  // Semaine précédente (6-12 janvier)
  {
    date: '2025-01-06',
    time: '13:30',
    event: 'US NFP',
    currency: 'USD',
    impact: 'High',
    actual: '256K',
    forecast: '160K',
    previous: '227K'
  },
  {
    date: '2025-01-07',
    time: '09:00',
    event: 'German Factory Orders',
    currency: 'EUR',
    impact: 'Medium',
    actual: '0.2%',
    forecast: '0.5%',
    previous: '-0.5%'
  },
  {
    date: '2025-01-08',
    time: '13:30',
    event: 'US CPI',
    currency: 'USD',
    impact: 'High',
    actual: '3.2%',
    forecast: '3.3%',
    previous: '3.1%'
  },
  {
    date: '2025-01-09',
    time: '02:00',
    event: 'China CPI',
    currency: 'CNY',
    impact: 'Medium',
    actual: '1.9%',
    forecast: '2.1%',
    previous: '1.6%'
  },
  {
    date: '2025-01-10',
    time: '13:30',
    event: 'US PPI',
    currency: 'USD',
    impact: 'Medium',
    actual: '3.0%',
    forecast: '2.8%',
    previous: '2.4%'
  },

  // Semaine actuelle (13-19 janvier)
  {
    date: '2025-01-13',
    time: '13:30',
    event: 'US Retail Sales',
    currency: 'USD',
    impact: 'High',
    actual: '',
    forecast: '0.6%',
    previous: '0.7%'
  },
  {
    date: '2025-01-14',
    time: '09:00',
    event: 'EUR GDP',
    currency: 'EUR',
    impact: 'High',
    actual: '',
    forecast: '0.9%',
    previous: '0.4%'
  },
  {
    date: '2025-01-15',
    time: '13:45',
    event: 'ECB Interest Rate',
    currency: 'EUR',
    impact: 'High',
    actual: '',
    forecast: '3.25%',
    previous: '3.25%'
  },
  {
    date: '2025-01-16',
    time: '02:00',
    event: 'China GDP',
    currency: 'CNY',
    impact: 'High',
    actual: '',
    forecast: '4.8%',
    previous: '4.6%'
  },
  {
    date: '2025-01-17',
    time: '13:30',
    event: 'US Housing Starts',
    currency: 'USD',
    impact: 'Medium',
    actual: '',
    forecast: '1.35M',
    previous: '1.29M'
  },
  {
    date: '2025-01-17',
    time: '14:15',
    event: 'US Industrial Production',
    currency: 'USD',
    impact: 'Medium',
    actual: '',
    forecast: '0.3%',
    previous: '0.2%'
  },

  // Semaine suivante (20-26 janvier)
  {
    date: '2025-01-20',
    time: '13:30',
    event: 'US Existing Home Sales',
    currency: 'USD',
    impact: 'Medium',
    actual: '',
    forecast: '4.15M',
    previous: '4.15M'
  },
  {
    date: '2025-01-21',
    time: '09:30',
    event: 'UK CPI',
    currency: 'GBP',
    impact: 'High',
    actual: '',
    forecast: '2.7%',
    previous: '2.6%'
  },
  {
    date: '2025-01-22',
    time: '13:30',
    event: 'US Initial Jobless Claims',
    currency: 'USD',
    impact: 'Medium',
    actual: '',
    forecast: '220K',
    previous: '201K'
  },
  {
    date: '2025-01-23',
    time: '09:00',
    event: 'EUR PMI Manufacturing',
    currency: 'EUR',
    impact: 'Medium',
    actual: '',
    forecast: '46.1',
    previous: '46.1'
  },
  {
    date: '2025-01-24',
    time: '14:30',
    event: 'US GDP',
    currency: 'USD',
    impact: 'High',
    actual: '',
    forecast: '2.8%',
    previous: '2.8%'
  },
  {
    date: '2025-01-24',
    time: '02:00',
    event: 'Japan CPI',
    currency: 'JPY',
    impact: 'High',
    actual: '',
    forecast: '2.9%',
    previous: '2.9%'
  }
];
