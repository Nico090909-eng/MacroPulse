# MacroPulse

MacroPulse est un tableau de bord web dédié au suivi et à l'analyse des tendances macroéconomiques. Construit avec **React**, **TypeScript** et **Vite**, il agrège des indicateurs économiques clés, les principaux évènements géopolitiques et des analyses de marché pour offrir une vision d'ensemble aux analystes et passionnés de macro.

## Mise à jour du calendrier

Pour actualiser les évènements économiques depuis ForexFactory, exécutez&nbsp;:

```bash
npm run scrape:calendar
```

Le script récupère les données de la semaine passée, de la semaine actuelle et de la semaine suivante puis écrit le résultat dans `src/data/economicCalendar.ts`.

## Objectifs du projet

- Centraliser les informations économiques pertinentes dans une interface unique.
- Faciliter la visualisation des évolutions grâce à des graphiques interactifs.
- Fournir un aperçu rapide des évènements à venir ayant un impact potentiel sur les marchés.

## Installation

1. Clonez le dépôt et placez-vous à la racine du projet.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
4. Générez une version de production si nécessaire :
   ```bash
   npm run build
   ```
5. Pour vérifier la qualité du code, vous pouvez exécuter :
   ```bash
   npm run lint
   ```

## Structure du code

- `src/` contient le code applicatif principal.
  - `main.tsx` initialise React et monte l'application dans `index.html`.
  - `App.tsx` regroupe l'essentiel de la logique de l'interface : barre latérale, tableaux d'indicateurs, calendrier et graphiques via **Recharts**.
  - `index.css` configure TailwindCSS pour le style.
- Les fichiers `vite.config.ts` et `tailwind.config.js` définissent la configuration de build et du framework CSS.

## Fonctionnalités principales

- Tableau d'indicateurs économiques avec suivi de la variation et de l'impact.
- Liste d'évènements géopolitiques classés par région et sévérité.
- Analyses de marché résumées par catégorie (inflation, croissance, etc.).
- Calendrier économique détaillé avec filtrage par semaine.

## Démo

Une démonstration est disponible à l'adresse suivante : [MacroPulse Demo](https://example.com/demo).

---

Projet initialisé à partir d'un modèle **Vite React TypeScript** avec prise en charge de **TailwindCSS**.
