# MacroPulse

This project is a React-based dashboard for macroeconomic analysis.

## Calendar Data Scraper

To update the economic calendar with recent events from ForexFactory, run:

```bash
npm run scrape:calendar
```

The script fetches data for last week, the current week and next week,
and writes the result to `src/data/economicCalendar.ts`.
