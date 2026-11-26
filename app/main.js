// Nusantara Stats router and state. Hash routes: #/overview, #/economy,
// #/people, #/health, #/education, #/regions. State (year, region, sort)
// lives in memory and drives the views; changing a control re-renders.
import { VIEWS, drawCharts } from './views.js';

const state = { year: 2025, region: 'All regions', sortKey: 'population' };
const app = document.getElementById('app');
const NAV = [
  ['overview', 'Overview'],
  ['economy', 'Economy'],
  ['people', 'People'],
  ['health', 'Health'],
  ['education', 'Education'],
  ['regions', 'Regions'],
];

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const route = hash.split('/')[0];
  return VIEWS[route] ? route : 'overview';
}

export function render() {
  const route = currentRoute();
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === route);
  });
  app.innerHTML = VIEWS[route](state);
  drawCharts(state);
  window.__shotReady = true;
}

app.addEventListener('change', (event) => {
  const target = event.target;
  if (target.dataset.action === 'year') {
    state.year = Number(target.value);
    render();
  }
  if (target.dataset.action === 'region') {
    state.region = target.value;
    render();
  }
  if (target.dataset.action === 'sort') {
    state.sortKey = target.value;
    render();
  }
});

window.addEventListener('hashchange', render);
render();
