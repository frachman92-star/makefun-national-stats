// Views for Nusantara Stats: one render function per section, plus the
// chart drawing that runs once a page is in the DOM.
// Every figure shown here carries its year and source; the year selector
// on the overview and economy pages re-renders the figures from data.js.
import { AGE_STRUCTURE, EDUCATION, HEADLINE, HEALTH, PROVINCES, REGIONS, SOURCES_NOTE, YEARS, YEARLY } from './data.js';
import { drawBarChart, drawHBarChart, drawLineChart } from './charts.js';

// Escape text that goes into the page markup.
function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

// The year <select> options, with the current year marked selected.
function yearOptions(current) {
  const options = YEARS.map((year) => {
    const selected = year === current ? ' selected' : '';
    return `<option value="${year}"${selected}>${year}</option>`;
  });
  return options.join('');
}

function sourcesFooter() {
  return `<p class="sources">${esc(SOURCES_NOTE)}</p>`;
}

// One headline stat card: label on top, big value, note and source below.
function statCard(label, value, note, smallValue) {
  const valueClass = smallValue ? 'stat-value small' : 'stat-value';
  return `<article class="card stat"><div class="stat-label">${esc(label)}</div><div class="${valueClass}">${esc(value)}</div><div class="stat-note">${note}</div></article>`;
}

function yearControl(state) {
  return `<div class="controls"><label>Year <select id="year-select" data-action="year">${yearOptions(state.year)}</select></label></div>`;
}

export function renderOverview(state) {
  const year = YEARLY[state.year];
  const headlineCards = HEADLINE.map((item) =>
    statCard(item.label, item.value, `${esc(item.note)} &middot; ${esc(item.source)}`),
  ).join('');

  return `
  <h1>Indonesia at a glance</h1>
  <p class="lede">Headline statistics for Indonesia, the world\u2019s fourth most populous country and Southeast Asia\u2019s largest economy.</p>
  <div class="controls"><label>Year <select id="year-select" data-action="year">${yearOptions(state.year)}</select></label>
  <span class="control-note">Figures below follow the selected year.</span></div>
  <section class="grid stats-grid">${headlineCards}</section>
  <section class="grid two">
    <article class="card"><h2>GDP growth, % per year</h2>
      <p class="chart-note">Real GDP growth, ${state.year} in focus. Source: BPS.</p>
      <canvas id="chart-gdp" width="560" height="260"></canvas></article>
    <article class="card"><h2>Unemployment rate, %</h2>
      <p class="chart-note">Open unemployment, August of each year. Source: BPS.</p>
      <canvas id="chart-unemp" width="560" height="260"></canvas></article>
  </section>
  <section class="card"><h2>${state.year} in numbers</h2>
    <p>In ${state.year}, Indonesia\u2019s economy grew ${year.gdpGrowth.toFixed(2)}%, unemployment stood at ${year.unemployment.toFixed(2)}%, inflation at ${year.inflation.toFixed(2)}%, and the poverty rate at ${year.poverty.toFixed(2)}%. GDP reached about $${year.gdpUsd.toLocaleString()} billion, or about $${year.gdpPerCapita.toLocaleString()} per person, for a population of about ${year.population.toFixed(1)} million.</p>
  </section>
  ${sourcesFooter()}`;
}

export function renderEconomy(state) {
  const year = YEARLY[state.year];
  const approx = state.year === 2025 ? 'approx., ' : '';
  const economyCards = [
    statCard(`GDP growth, ${state.year}`, `${year.gdpGrowth.toFixed(2)}%`, 'BPS'),
    statCard(`GDP, ${state.year}`, `$${year.gdpUsd.toLocaleString()}bn`, `${approx}World Bank`),
    statCard(`GDP per capita, ${state.year}`, `$${year.gdpPerCapita.toLocaleString()}`, `${approx}World Bank`),
    statCard(`Inflation, ${state.year}`, `${year.inflation.toFixed(2)}%`, 'BPS'),
    statCard(`Poverty rate, ${state.year}`, `${year.poverty.toFixed(2)}%`, 'BPS, September'),
  ].join('');

  return `
  <h1>Economy</h1>
  <p class="lede">Growth, prices and poverty, 2020 to ${YEARS[YEARS.length - 1]}.</p>
  ${yearControl(state)}
  <section class="grid stats-grid">
    ${economyCards}
  </section>
  <section class="grid two">
    <article class="card"><h2>GDP growth by year</h2><canvas id="chart-gdp" width="560" height="260"></canvas></article>
    <article class="card"><h2>Poverty rate by year</h2><canvas id="chart-poverty" width="560" height="260"></canvas></article>
  </section>
  <section class="card"><h2>What drives the economy</h2>
    <p>Manufacturing, agriculture, mining, trade and construction are the largest contributors to GDP. Household consumption is about half of GDP, and exports of coal, palm oil, nickel and manufactured goods link the economy to world markets. Inflation stayed low in 2024 at 1.57% after the 5.51% spike of 2022, and the poverty rate fell to 8.57% in September 2024, its lowest on record.</p>
  </section>
  ${sourcesFooter()}`;
}

export function renderPeople() {
  const topEight = [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 8);
  const ageBars = AGE_STRUCTURE.map((band) =>
    `<li><span class="bar-label">${esc(band.group)}</span><span class="bar-track"><span class="bar-fill" style="width:${band.share}%"></span></span><span class="bar-value">${band.share.toFixed(1)}%</span></li>`,
  ).join('');

  return `
  <h1>People</h1>
  <p class="lede">A population of about 283.5 million (2025, BPS), spread across more than 17,000 islands and 38 provinces.</p>
  <section class="grid stats-grid">
    ${statCard('Population', '283.5m', 'approx., 2025 &middot; BPS')}
    ${statCard('Median age', '31.2 yrs', 'approx., 2024 &middot; BPS')}
    ${statCard('Urban population', '58.6%', '2024 &middot; BPS')}
    ${statCard('Largest province', 'West Java', '50.3m people, 2024 &middot; BPS')}
  </section>
  <section class="grid two">
    <article class="card"><h2>Population by province, millions</h2>
      <p class="chart-note">Eight most populous provinces, 2024. Source: BPS.</p>
      <canvas id="chart-prov-pop" width="560" height="340"></canvas></article>
    <article class="card"><h2>Age structure, 2024</h2>
      <p class="chart-note">Share of population by age group. Source: BPS.</p>
      <ul class="bars">${ageBars}</ul>
      <p>About two in three Indonesians are of working age, a demographic dividend that lasts into the 2030s.</p></article>
  </section>
  ${sourcesFooter()}`;
}

export function renderHealth() {
  const healthCards = HEALTH.map((item) =>
    statCard(item.label, item.value, `${esc(item.year)} &middot; ${esc(item.source)}`, true),
  ).join('');

  return `
  <h1>Health</h1>
  <p class="lede">Life expectancy, mortality and health services across the archipelago.</p>
  <section class="grid stats-grid">
    ${healthCards}
  </section>
  <section class="card"><h2>Health in context</h2>
    <p>Life expectancy reached 74.2 years in 2024, up from about 71 years a decade earlier. The national health insurance scheme, BPJS Kesehatan, covers most of the population. Stunting among children under five fell to 19.8% in 2024, though it remains a national priority, and access to doctors is still uneven between Java and the eastern provinces.</p>
  </section>
  ${sourcesFooter()}`;
}

export function renderEducation() {
  const educationCards = EDUCATION.map((item) =>
    statCard(item.label, item.value, `${esc(item.year)} &middot; ${esc(item.source)}`, true),
  ).join('');

  return `
  <h1>Education</h1>
  <p class="lede">Literacy, schooling and enrolment from primary school to university.</p>
  <section class="grid stats-grid">
    ${educationCards}
  </section>
  <section class="card"><h2>Education in context</h2>
    <p>Almost every child now completes primary school, and mean years of schooling reached 9.0 years in 2024, about the end of junior high. The challenge is quality and the jump to senior high and university: about 9.3 million students were enrolled in higher education in 2024, and the government\u2019s free nutritious meals programme aims to reach tens of millions of schoolchildren.</p>
  </section>
  ${sourcesFooter()}`;
}

// Provinces after the region filter, in the requested sort order.
function filteredProvinces(state) {
  const inRegion = PROVINCES.filter((p) => state.region === 'All regions' || p.region === state.region);
  return [...inRegion].sort((a, b) => {
    if (state.sortKey === 'name') return a.name.localeCompare(b.name);
    if (state.sortKey === 'grdp') return b.grdp - a.grdp;
    return b.population - a.population;
  });
}

export function renderRegions(state) {
  const rows = filteredProvinces(state);
  const totalPopulation = rows.reduce((sum, p) => sum + p.population, 0);
  const totalGrdp = rows.reduce((sum, p) => sum + p.grdp, 0);
  const regionOptions = REGIONS.map((region) => {
    const selected = region === state.region ? ' selected' : '';
    return `<option${selected}>${region}</option>`;
  }).join('');
  const tableRows = rows.map((p) =>
    `<tr><td>${esc(p.name)}</td><td>${esc(p.region)}</td><td>${p.population.toFixed(1)}</td><td>${p.grdp.toLocaleString()}</td></tr>`,
  ).join('');

  return `
  <h1>Regions</h1>
  <p class="lede">Population and gross regional domestic product by province, 2024. Figures are approximate (BPS).</p>
  <div class="controls">
    <label>Region <select id="region-select" data-action="region">${regionOptions}</select></label>
    <label>Sort by <select id="sort-select" data-action="sort">
      <option value="population"${state.sortKey === 'population' ? ' selected' : ''}>Population</option>
      <option value="grdp"${state.sortKey === 'grdp' ? ' selected' : ''}>GRDP</option>
      <option value="name"${state.sortKey === 'name' ? ' selected' : ''}>Name</option>
    </select></label>
    <span class="control-note">${rows.length} provinces shown &middot; ${totalPopulation.toFixed(1)}m people &middot; Rp ${totalGrdp.toLocaleString()}tn GRDP</span>
  </div>
  <section class="card table-card"><table>
    <thead><tr><th>Province</th><th>Region</th><th>Population (millions)</th><th>GRDP (Rp trillion)</th></tr></thead>
    <tbody>${tableRows}</tbody>
  </table></section>
  <section class="grid two">
    <article class="card"><h2>Population by province, millions</h2>
      <p class="chart-note">Provinces in the current filter, 2024. Source: BPS.</p>
      <canvas id="chart-regions" width="560" height="340"></canvas></article>
    <article class="card"><h2>Java dominates</h2>
      <p>Java holds more than half of Indonesia\u2019s people on about 7% of its land. Jakarta\u2019s GRDP of about Rp 3,400 trillion is the largest of any province, followed by East Java and West Java. Outside Java, resource-rich East Kalimantan and Riau punch above their population in GRDP thanks to coal, oil and palm oil.</p></article>
  </section>
  ${sourcesFooter()}`;
}

// Draw every chart the current page needs, once it is in the DOM.
export function drawCharts(state) {
  const gdpCanvas = document.getElementById('chart-gdp');
  if (gdpCanvas) {
    drawBarChart(gdpCanvas, YEARS.map(String), YEARS.map((y) => YEARLY[y].gdpGrowth), { format: (v) => `${v.toFixed(2)}%` });
  }

  const unempCanvas = document.getElementById('chart-unemp');
  if (unempCanvas) {
    drawLineChart(unempCanvas, YEARS.map(String), YEARS.map((y) => YEARLY[y].unemployment), { format: (v) => `${v.toFixed(2)}%` });
  }

  const povertyCanvas = document.getElementById('chart-poverty');
  if (povertyCanvas) {
    drawLineChart(povertyCanvas, YEARS.map(String), YEARS.map((y) => YEARLY[y].poverty), { color: '#8a5a00', format: (v) => `${v.toFixed(2)}%` });
  }

  const provinceCanvas = document.getElementById('chart-prov-pop');
  if (provinceCanvas) {
    const top = [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 8);
    drawHBarChart(provinceCanvas, top.map((p) => p.name), top.map((p) => p.population), { format: (v) => `${v.toFixed(1)}m` });
  }

  const regionsCanvas = document.getElementById('chart-regions');
  if (regionsCanvas) {
    const rows = filteredProvinces(state).slice(0, 10);
    drawHBarChart(regionsCanvas, rows.map((p) => p.name), rows.map((p) => p.population), { format: (v) => `${v.toFixed(1)}m` });
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
