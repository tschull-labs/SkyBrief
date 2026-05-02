# SkyBrief ✈️

A mobile-first aviation weather web app built with React. Search any airport by ICAO code and get decoded METAR, TAF forecasts, and an active runway estimate — all in a clean glassmorphism UI inspired by StationWX.

Live data from [aviationweather.gov](https://aviationweather.gov) — no API key or backend required.

---

## Screenshots

> Home (METAR) · TAF Timeline · Runway Estimator

---

## Features

### METAR Decoder
- Wind direction & speed (kt and km/h), gusts
- Temperature & dewpoint with spread indicator
- Visibility (SM and meters)
- Cloud layers with coverage type (FEW/SCT/BKN/OVC) in feet and meters
- QNH pressure (hPa and inHg)
- Flight category badge: **VFR** (green) · **MVFR** (blue) · **IFR** (red) · **LIFR** (purple)
- Observation time: local, UTC, and "X minutes ago"
- Collapsible raw METAR string

### TAF Forecast
- Full timeline of forecast periods (FM, BECMG, TEMPO, PROB30/40)
- Wind, visibility, weather, and cloud data per period
- Flight category badge per period
- Collapsible raw TAF string

### Active Runway Estimator
- Calculates likely active runway from METAR wind direction
- Shows active and reciprocal runway numbers with compass bearings
- SVG compass rose with animated wind arrow
- Handles variable wind and calm wind edge cases
- Safety disclaimer: estimated only, not official ATC data

### Map View
- Leaflet.js map centered on the searched airport (CartoDB light tiles)
- Colored marker matching the current flight category
- Smooth `flyTo` animation when switching airports

### UX
- Floating glassmorphism bottom nav bar (pill shape, like StationWX)
- Favorites list — save up to 5 airports (localStorage)
- Last searched airport remembered on reload (localStorage)
- Auto-refresh every 10 minutes (pauses when tab is hidden)
- Skeleton loading screens, typed error states, and retry buttons
- Mobile-first, works great on desktop too

---

## Tech Stack

| | |
|---|---|
| Framework | React 19 + Vite 6 |
| Styling | Tailwind CSS v4 (glassmorphism via `@layer components`) |
| Map | Leaflet.js + react-leaflet v5 |
| Data | [aviationweather.gov](https://aviationweather.gov/api/data) (no API key) |
| Fonts | Inter + JetBrains Mono (Google Fonts) |

---

## Getting Started

```bash
git clone https://github.com/tschull-labs/SkyBrief.git
cd SkyBrief
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and search for any ICAO code (e.g. `KJFK`, `LOWI`, `EDDF`).

### Build for production

```bash
npm run build
npm run preview
```

---

## API Endpoints Used

| Data | URL |
|---|---|
| METAR | `https://aviationweather.gov/api/data/metar?ids={ICAO}&format=json` |
| TAF | `https://aviationweather.gov/api/data/taf?ids={ICAO}&format=json` |

---

## Project Structure

```
src/
├── api/            # Fetch functions for METAR and TAF
├── components/
│   ├── favorites/  # Favorites list and card
│   ├── layout/     # Bottom navigation bar
│   ├── map/        # Leaflet map wrapper
│   ├── metar/      # All METAR display components
│   ├── runway/     # Runway estimator and compass rose
│   ├── search/     # Search bar
│   ├── shared/     # GlassCard, SkeletonCard, ErrorCard, EmptyState
│   └── taf/        # TAF card and period components
├── constants/      # Shared constants (categories, API base, storage keys)
├── hooks/          # useAirportData, useFavorites, useAutoRefresh, useLocalStorage
├── pages/          # HomeTab, TafTab, RunwayTab, FavoritesTab
└── utils/          # metarDecoder, flightCategory, runwayCalculator, formatters
```

---

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).
