import fetch from 'node-fetch';
import { parse } from 'fast-xml-parser';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const base = 'https://nfs.faireconomy.media/ff_calendar_';
const feeds = ['lastweek', 'thisweek', 'nextweek'];

async function fetchWeek(week) {
  const url = `${base}${week}.xml`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  const xml = await res.text();
  const parsed = parse(xml, { ignoreAttributes: false });
  const events = parsed?.weeklyevents?.event || [];
  return Array.isArray(events) ? events : [events];
}

function mapEvent(e) {
  const impact = String(e.impact || '').toLowerCase();
  if (impact !== 'high' && impact !== 'medium') return null;
  return {
    date: e.date,
    currency: e.currency || e.country,
    impact: e.impact,
    detail: e.title,
    actual: e.actual,
    forecast: e.forecast,
    previous: e.previous,
  };
}

async function main() {
  const all = [];
  for (const week of feeds) {
    const events = await fetchWeek(week);
    for (const e of events) {
      const mapped = mapEvent(e);
      if (mapped) all.push(mapped);
    }
  }
  const out =
    'export const economicCalendar = ' +
    JSON.stringify(all, null, 2) +
    ' as const;\n';
  await writeFile(join('src', 'data', 'economicCalendar.ts'), out);
  console.log(`Saved ${all.length} events`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
