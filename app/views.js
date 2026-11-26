// Views for Nusantara Stats: one render function per section.
// Every figure carries its year and source; the year selector on the
// overview and economy pages re-renders the figures from data.js.
import { AGE_STRUCTURE, EDUCATION, HEADLINE, HEALTH, PROVINCES, REGIONS, SOURCES_NOTE, YEARS, YEARLY } from './data.js';
import { drawBarChart, drawHBarChart, drawLineChart } from './charts.js';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function yearOptions(selected) {
  return YEARS.map((y) => `<option value="${y}"${y === selected ? ' selected' : ''}>${y}</option>`).join('');
}

function sourceLine() {
  return `<p class="sources">${esc(SOURCES_NOTE)}</p>`;
}

export function renderOverview(state) {
  const y = YEARLY[state.year];
  const cards = HEADLINE.map(
    (h) => `<article class="card stat"><div class="stat-label">${esc(h.label)}</div><div class="stat-value">${esc(h.value)}</div><div class="stat-note">${esc(h.note)} &middot; ${esc(h.source)}</div></article>`,
  ).join('');
  return `
  <h1>Indonesia at a glance</h1>
  <p class="lede">Headline statistics for Indonesia, the world\u2019s fourth most populous country and Southeast Asia\u2019s largest economy.</p>
  <div class="controls"><label>Year <select id="year-select" data-action="year">${yearOptions(state.year)}</select></label>
  <span class="control-note">Figures below follow the selected year.</span></div>
  <section class="grid stats-grid">${cards}</section>
  <section class="grid two">
    <article class="card"><h2>GDP growth, % per year</h2>
      <p class="chart-note">Real GDP growth, ${state.year} in focus. Source: BPS.</p>
      <canvas id="chart-gdp" width="560" height="260"></canvas></article>
    <article class="card"><h2>Unemployment rate, %</h2>
      <p class="chart-note">Open unemployment, August of each year. Source: BPS.</p>
      <canvas id="chart-unemp" width="560" height="260"></canvas></article>
  </section>
  <section class="card"><h2>${state.year} in numbers</h2>
    <p>In ${state.year}, Indonesia\u2019s economy grew ${y.gdpGrowth.toFixed(2)}%, unemployment stood at ${y.unemployment.toFixed(2)}%, inflation at ${y.inflation.toFixed(2)}%, and the poverty rate at ${y.poverty.toFixed(2)}%. GDP reached about $${y.gdpUsd.toLocaleString()} billion, or about $${y.gdpPerCapita.toLocaleString()} per person, for a population of about ${y.population.toFixed(1)} million.</p>
  </section>
  ${sourceLine()}`;
}

export function renderEconomy(state) {
  const y = YEARLY[state.year];
  return `
  <h1>Economy</h1>
  <p class="lede">Growth, prices and poverty, 2020 to ${YEARS[YEARS.length - 1]}.</p>
  <div class="controls"><label>Year <select id="year-select" data-action="year">${yearOptions(state.year)}</select></label></div>
  <section class="grid stats-grid">
    <article class="card stat"><div class="stat-label">GDP growth, ${state.year}</div><div class="stat-value">${y.gdpGrowth.toFixed(2)}%</div><div class="stat-note">BPS</div></article>
    <article class="card stat"><div class="stat-label">GDP, ${state.year}</div><div class="stat-value">$${y.gdpUsd.toLocaleString()}bn</div><div class="stat-note">${state.year === 2025 ? 'approx., ' : ''}World Bank</div></article>
    <article class="card stat"><div class="stat-label">GDP per capita, ${state.year}</div><div class="stat-value">$${y.gdpPerCapita.toLocaleString()}</div><div class="stat-note">${state.year === 2025 ? 'approx., ' : ''}World Bank</div></article>
    <article class="card stat"><div class="stat-label">Inflation, ${state.year}</div><div class="stat-value">${y.inflation.toFixed(2)}%</div><div class="stat-note">BPS</div></article>
    <article class="card stat"><div class="stat-label">Poverty rate, ${state.year}</div><div class="stat-value">${y.poverty.toFixed(2)}%</div><div class="stat-note">BPS, September</div></article>
  </section>
  <section class="grid two">
    <article class="card"><h2>GDP growth by year</h2><canvas id="chart-gdp" width="560" height="260"></canvas></article>
    <article class="card"><h2>Poverty rate by year</h2><canvas id="chart-poverty" width="560" height="260"></canvas></article>
  </section>
  <section class="card"><h2>What drives the economy</h2>
    <p>Manufacturing, agriculture, mining, trade and construction are the largest contributors to GDP. Household consumption is about half of GDP, and exports of coal, palm oil, nickel and manufactured goods link the economy to world markets. Inflation stayed low in 2024 at 1.57% after the 5.51% spike of 2022, and the poverty rate fell to 8.57% in September 2024, its lowest on record.</p>
  </section>
  ${sourceLine()}`;
}

export function renderPeople() {
  const top = [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 8);
  return `
  <h1>People</h1>
  <p class="lede">A population of about 283.5 million (2025, BPS), spread across more than 17,000 islands and 38 provinces.</p>
  <section class="grid stats-grid">
    <article class="card stat"><div class="stat-label">Population</div><div class="stat-value">283.5m</div><div class="stat-note">approx., 2025 &middot; BPS</div></article>
    <article class="card stat"><div class="stat-label">Median age</div><div class="stat-value">31.2 yrs</div><div class="stat-note">approx., 2024 &middot; BPS</div></article>
    <article class="card stat"><div class="stat-label">Urban population</div><div class="stat-value">58.6%</div><div class="stat-note">2024 &middot; BPS</div></article>
    <article class="card stat"><div class="stat-label">Largest province</div><div class="stat-value">West Java</div><div class="stat-note">50.3m people, 2024 &middot; BPS</div></article>
  </section>
  <section class="grid two">
    <article class="card"><h2>Population by province, millions</h2>
      <p class="chart-note">Eight most populous provinces, 2024. Source: BPS.</p>
      <canvas id="chart-prov-pop" width="560" height="340"></canvas></article>
    <article class="card"><h2>Age structure, 2024</h2>
      <p class="chart-note">Share of population by age group. Source: BPS.</p>
      <ul class="bars">${AGE_STRUCTURE.map((a) => `<li><span class="bar-label">${esc(a.group)}</span><span class="bar-track"><span class="bar-fill" style="width:${a.share}%"></span></span><span class="bar-value">${a.share.toFixed(1)}%</span></li>`).join('')}</ul>
      <p>About two in three Indonesians are of working age, a demographic dividend that lasts into the 2030s.</p></article>
  </section>
  ${sourceLine()}`;
}

export function renderHealth() {
  return `
  <h1>Health</h1>
  <p class="lede">Life expectancy, mortality and health services across the archipelago.</p>
  <section class="grid stats-grid">
    ${HEALTH.map((h) => `<article class="card stat"><div class="stat-label">${esc(h.label)}</div><div class="stat-value small">${esc(h.value)}</div><div class="stat-note">${esc(h.year)} &middot; ${esc(h.source)}</div></article>`).join('')}
  </section>
  <section class="card"><h2>Health in context</h2>
    <p>Life expectancy reached 74.2 years in 2024, up from about 71 years a decade earlier. The national health insurance scheme, BPJS Kesehatan, covers most of the population. Stunting among children under five fell to 19.8% in 2024, though it remains a national priority, and access to doctors is still uneven between Java and the eastern provinces.</p>
  </section>
  ${sourceLine()}`;
}

export function renderEducation() {
  return `
  <h1>Education</h1>
  <p class="lede">Literacy, schooling and enrolment from primary school to university.</p>
  <section class="grid stats-grid">
    ${EDUCATION.map((e) => `<article class="card stat"><div class="stat-label">${esc(e.label)}</div><div class="stat-value small">${esc(e.value)}</div><div class="stat-note">${esc(e.year)} &middot; ${esc(e.source)}</div></article>`).join('')}
  </section>
  <section class="card"><h2>Education in context</h2>
    <p>Almost every child now completes primary school, and mean years of schooling reached 9.0 years in 2024, about the end of junior high. The challenge is quality and the jump to senior high and university: about 9.3 million students were enrolled in higher education in 2024, and the government\u2019s free nutritious meals programme aims to reach tens of millions of schoolchildren.</p>
  </section>
  ${sourceLine()}`;
}

function provinceRows(state) {
  let rows = PROVINCES.filter((p) => state.region === 'All regions' || p.region === state.region);
  const key = state.sortKey;
  rows = [...rows].sort((a, b) => {
    if (key === 'name') return a.name.localeCompare(b.name);
    if (key === 'grdp') return b.grdp - a.grdp;
    return b.population - a.population;
  });
  return rows;
}

export function renderRegions(state) {
  const rows = provinceRows(state);
  const totalPop = rows.reduce((s, p) => s + p.population, 0);
  const totalGrdp = rows.reduce((s, p) => s + p.grdp, 0);
  return `
  <h1>Regions</h1>
  <p class="lede">Population and gross regional domestic product by province, 2024. Figures are approximate (BPS).</p>
  <div class="controls">
    <label>Region <select id="region-select" data-action="region">${REGIONS.map((r) => `<option${r === state.region ? ' selected' : ''}>${r}</option>`).join('')}</select></label>
    <label>Sort by <select id="sort-select" data-action="sort">
      <option value="population"${state.sortKey === 'population' ? ' selected' : ''}>Population</option>
      <option value="grdp"${state.sortKey === 'grdp' ? ' selected' : ''}>GRDP</option>
      <option value="name"${state.sortKey === 'name' ? ' selected' : ''}>Name</option>
    </select></label>
    <span class="control-note">${rows.length} provinces shown &middot; ${totalPop.toFixed(1)}m people &middot; Rp ${totalGrdp.toLocaleString()}tn GRDP</span>
  </div>
  <section class="card table-card"><table>
    <thead><tr><th>Province</th><th>Region</th><th>Population (millions)</th><th>GRDP (Rp trillion)</th></tr></thead>
    <tbody>${rows.map((p) => `<tr><td>${esc(p.name)}</td><td>${esc(p.region)}</td><td>${p.population.toFixed(1)}</td><td>${p.grdp.toLocaleString()}</td></tr>`).join('')}</tbody>
  </table></section>
  <section class="grid two">
    <article class="card"><h2>Population by province, millions</h2>
      <p class="chart-note">Provinces in the current filter, 2024. Source: BPS.</p>
      <canvas id="chart-regions" width="560" height="340"></canvas></article>
    <article class="card"><h2>Java dominates</h2>
      <p>Java holds more than half of Indonesia\u2019s people on about 7% of its land. Jakarta\u2019s GRDP of about Rp 3,400 trillion is the largest of any province, followed by East Java and West Java. Outside Java, resource-rich East Kalimantan and Riau punch above their population in GRDP thanks to coal, oil and palm oil.</p></article>
  </section>
  ${sourceLine()}`;
}

// Draw the charts a rendered page needs, once it is in the DOM.
export function drawCharts(state) {
  const gdp = document.getElementById('chart-gdp');
  if (gdp) {
    drawBarChart(gdp, YEARS.map(String), YEARS.map((y) => YEARLY[y].gdpGrowth), { format: (v) => `${v.toFixed(2)}%` });
  }
  const unemp = document.getElementById('chart-unemp');
  if (unemp) {
    drawLineChart(unemp, YEARS.map(String), YEARS.map((y) => YEARLY[y].unemployment), { format: (v) => `${v.toFixed(2)}%` });
  }
  const poverty = document.getElementById('chart-poverty');
  if (poverty) {
    drawLineChart(poverty, YEARS.map(String), YEARS.map((y) => YEARLY[y].poverty), { color: '#8a5a00', format: (v) => `${v.toFixed(2)}%` });
  }
  const provPop = document.getElementById('chart-prov-pop');
  if (provPop) {
    const top = [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 8);
    drawHBarChart(provPop, top.map((p) => p.name), top.map((p) => p.population), { format: (v) => `${v.toFixed(1)}m` });
  }
  const regions = document.getElementById('chart-regions');
  if (regions) {
    const rows = provinceRows(state).slice(0, 10);
    drawHBarChart(regions, rows.map((p) => p.name), rows.map((p) => p.population), { format: (v) => `${v.toFixed(1)}m` });
  }
}

export const VIEWS = {
  overview: renderOverview,
  economy: renderEconomy,
  people: renderPeople,
  health: renderHealth,
  education: renderEducation,
  regions: renderRegions,
};
