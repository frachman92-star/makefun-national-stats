// Nusantara Stats data: Indonesia national statistics.
// Every figure is labeled with its year and source in the views that show it.
// Figures are rounded and marked approximate where the source figure is an
// estimate; nothing here is presented as more precise than its source.
// Sources: BPS (Statistics Indonesia), World Bank, Ministry of Health.

export const COUNTRY = {
  name: 'Indonesia',
  tagline: 'National statistics for the world\u2019s largest archipelago',
};

// Yearly headline series, 2020-2025. gdpGrowth, unemployment and inflation
// are BPS figures; poverty is the September rate (BPS); gdpUsd is World Bank
// current US dollars (2025 is an estimate, marked approximate in the UI).
export const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];
export const YEARLY = {
  2020: { gdpGrowth: -2.07, unemployment: 7.07, inflation: 1.68, poverty: 10.19, gdpUsd: 1058, gdpPerCapita: 3870, population: 274.2 },
  2021: { gdpGrowth: 3.70, unemployment: 6.49, inflation: 1.87, poverty: 9.71, gdpUsd: 1186, gdpPerCapita: 4293, population: 276.4 },
  2022: { gdpGrowth: 5.31, unemployment: 5.86, inflation: 5.51, poverty: 9.57, gdpUsd: 1319, gdpPerCapita: 4784, population: 278.7 },
  2023: { gdpGrowth: 5.05, unemployment: 5.45, inflation: 2.61, poverty: 9.36, gdpUsd: 1371, gdpPerCapita: 4875, population: 280.7 },
  2024: { gdpGrowth: 5.03, unemployment: 4.91, inflation: 1.57, poverty: 8.57, gdpUsd: 1396, gdpPerCapita: 4925, population: 281.6 },
  2025: { gdpGrowth: 5.1, unemployment: 4.76, inflation: 2.3, poverty: 8.5, gdpUsd: 1450, gdpPerCapita: 5080, population: 283.5 },
};

// Headline indicators shown on the overview (latest year, 2025 unless noted).
export const HEADLINE = [
  { id: 'population', label: 'Population', value: '283.5m', note: 'approx., 2025', source: 'BPS' },
  { id: 'gdp', label: 'GDP', value: '$1.45tn', note: 'approx., 2025', source: 'World Bank' },
  { id: 'gdpPerCapita', label: 'GDP per capita', value: '$5,080', note: 'approx., 2025', source: 'World Bank' },
  { id: 'unemployment', label: 'Unemployment rate', value: '4.76%', note: 'Feb 2025', source: 'BPS' },
  { id: 'inflation', label: 'Inflation (year on year)', value: '2.3%', note: 'approx., 2025', source: 'BPS' },
  { id: 'lifeExpectancy', label: 'Life expectancy', value: '74.2 yrs', note: '2024', source: 'BPS' },
  { id: 'literacy', label: 'Adult literacy rate', value: '96.7%', note: 'approx., 2024', source: 'BPS' },
  { id: 'poverty', label: 'Poverty rate', value: '8.57%', note: 'Sep 2024', source: 'BPS' },
];

// Population age structure, 2024 (BPS, percent of population, rounded).
export const AGE_STRUCTURE = [
  { group: '0\u201314 years', share: 24.5 },
  { group: '15\u201324 years', share: 16.8 },
  { group: '25\u201354 years', share: 43.9 },
  { group: '55\u201364 years', share: 8.6 },
  { group: '65+ years', share: 6.2 },
];

// Health indicators (BPS / Ministry of Health, latest available year shown).
export const HEALTH = [
  { label: 'Life expectancy at birth', value: '74.2 years', year: '2024', source: 'BPS' },
  { label: 'Infant mortality rate', value: '16 per 1,000 live births', year: 'approx., 2023', source: 'Ministry of Health' },
  { label: 'Maternal mortality ratio', value: '173 per 100,000 live births', year: 'approx., 2023', source: 'Ministry of Health' },
  { label: 'Stunting among children under 5', value: '19.8%', year: '2024', source: 'Ministry of Health' },
  { label: 'Health spending per capita', value: 'approx. $180', year: '2023', source: 'World Bank' },
  { label: 'Doctors per 10,000 people', value: 'approx. 6.4', year: '2023', source: 'Ministry of Health' },
];

// Education indicators (BPS, latest available year shown).
export const EDUCATION = [
  { label: 'Adult literacy rate', value: '96.7%', year: 'approx., 2024', source: 'BPS' },
  { label: 'Mean years of schooling', value: '9.0 years', year: '2024', source: 'BPS' },
  { label: 'Expected years of schooling', value: '13.2 years', year: '2024', source: 'BPS' },
  { label: 'Primary school enrolment', value: '99.2%', year: '2024', source: 'BPS' },
  { label: 'Secondary school enrolment', value: '91.5%', year: 'approx., 2024', source: 'BPS' },
  { label: 'University students', value: 'approx. 9.3 million', year: '2024', source: 'BPS' },
];

// Provinces: population (millions, 2024, BPS, approx.) and GRDP
// (gross regional domestic product, IDR trillion, 2024, BPS, approx.).
// Region groups: Java, Sumatra, Kalimantan, Sulawesi, Eastern Indonesia.
export const PROVINCES = [
  { name: 'West Java', region: 'Java', population: 50.3, grdp: 2800 },
  { name: 'East Java', region: 'Java', population: 41.8, grdp: 3100 },
  { name: 'Central Java', region: 'Java', population: 37.9, grdp: 1700 },
  { name: 'North Sumatra', region: 'Sumatra', population: 15.6, grdp: 1100 },
  { name: 'Banten', region: 'Java', population: 12.4, grdp: 820 },
  { name: 'Jakarta', region: 'Java', population: 10.6, grdp: 3400 },
  { name: 'South Sulawesi', region: 'Sulawesi', population: 9.5, grdp: 620 },
  { name: 'Lampung', region: 'Sumatra', population: 9.4, grdp: 480 },
  { name: 'South Sumatra', region: 'Sumatra', population: 9.0, grdp: 720 },
  { name: 'Riau', region: 'Sumatra', population: 6.8, grdp: 1010 },
  { name: 'West Sumatra', region: 'Sumatra', population: 6.0, grdp: 330 },
  { name: 'West Kalimantan', region: 'Kalimantan', population: 5.8, grdp: 290 },
  { name: 'Aceh', region: 'Sumatra', population: 5.6, grdp: 240 },
  { name: 'Bali', region: 'Eastern Indonesia', population: 4.4, grdp: 260 },
  { name: 'South Kalimantan', region: 'Kalimantan', population: 4.3, grdp: 260 },
  { name: 'East Kalimantan', region: 'Kalimantan', population: 4.0, grdp: 830 },
  { name: 'Yogyakarta', region: 'Java', population: 3.8, grdp: 180 },
  { name: 'Papua', region: 'Eastern Indonesia', population: 1.1, grdp: 120 },
];

export const REGIONS = ['All regions', 'Java', 'Sumatra', 'Kalimantan', 'Sulawesi', 'Eastern Indonesia'];

export const SOURCES_NOTE =
  'Figures: BPS (Statistics Indonesia) and the World Bank. 2025 figures are estimates and marked approximate.';
