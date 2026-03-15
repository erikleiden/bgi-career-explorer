# BGI Career Explorer

An interactive career exploration tool for high school career counselors, built by the **Burning Glass Institute**. Helps students search, filter, and explore 63 occupations using real Bureau of Labor Statistics data.

## What It Does

- **Search** occupations by name or alias (e.g., "nurse", "engineer", "CPA")
- **Filter** by career cluster, education level required, and job outlook
- **Sort** by wage, employment, outlook, or alphabetically
- **Click any occupation** to open a detail panel showing:
  - Median annual wage vs. national median ($48,060) with a visual bar chart
  - Total employment and projected annual openings
  - 10-year projected growth rate and BLS outlook category
  - Education and training pathway with notes
  - 4 typical job tasks
  - Work environment description
  - Alternative job titles / also-known-as names
  - SOC code and link to BLS Occupational Outlook Handbook

## Data

All data sourced from the U.S. Bureau of Labor Statistics:

| Source | Coverage |
|---|---|
| Occupational Employment & Wage Statistics (OES) | Median annual wages, May 2023 |
| Occupational Outlook Handbook (OOH) | Employment projections, 2023–2033 |

**63 occupations** across **16 career clusters** (Agriculture & Environment, Architecture & Construction, Arts & Communications, Business & Administration, Education & Training, Energy & Sustainability, Finance, Health Science, Hospitality & Tourism, Human Services, Information Technology, Law & Public Safety, Manufacturing, Marketing & Sales, Science & Engineering, Transportation & Logistics).

The national median wage benchmark is **$48,060** (all occupations, BLS OES 2023).

## Tech Stack

- **React + Vite** — SPA, no server required
- **Tailwind CSS v3** — utility-first styling with BGI brand colors
- **Recharts** — wage comparison bar chart
- **Lucide React** — icons

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import this repository
4. Click **Deploy** — no configuration needed (Vite auto-detected)

Every future `git push` to `main` will trigger an automatic redeploy.

## Project Structure

```
src/
├── assets/
│   └── bgi-logo.svg
├── components/
│   ├── FilterPanel.jsx          # Search + cluster/education/outlook dropdowns
│   ├── Footer.jsx               # BGI attribution and data source
│   ├── Header.jsx               # BGI logo + tool title
│   ├── OccupationCard.jsx       # Card tile for each occupation
│   ├── OccupationModal.jsx      # Detail modal on card click
│   ├── StatsBar.jsx             # Summary stats row
│   └── WageComparisonChart.jsx  # Recharts wage vs. national median
├── data/
│   └── occupations.js           # All 63 occupations + cluster/outlook config
├── lib/
│   └── utils.js                 # Formatting helpers
├── App.jsx                      # Root: state, filtering logic, layout
└── index.css                    # Tailwind base
```

---

© 2026 Burning Glass Institute · [burningglassinstitute.org](https://burningglassinstitute.org)
