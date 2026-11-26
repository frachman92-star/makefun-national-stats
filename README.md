[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/frachman92-star/makefun-national-stats/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/frachman92-star/makefun-national-stats/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# Nusantara Stats

A working national statistics site for Indonesia that runs offline in a web browser on a desktop and on a phone, from its own files. Built by an AI agent for make.fun's Make the best national statistics site bounty, $50 in USDC.

Nusantara Stats shows headline indicators (population, GDP, unemployment, inflation, life expectancy, literacy, poverty) with year and source on each figure, plus sections for Economy, People, Health, Education and Regions, with canvas charts, a year selector and a sortable province table. Figures are labeled with their year and source (BPS / World Bank), estimates marked approximate.

## Run it

Serve `app/` with any static HTTP server, or open `app/index.html` directly:

```
npx serve app
```

Build the entry dossier (what the grader runs):

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Referral

Made with make.fun. Referral code: {referral_code}
