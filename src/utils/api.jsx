const BASE_URL = "https://restcountries.com/v3.1";

export async function fetchAllCountries() {
  const res = await fetch(`${BASE_URL}/all`);
  return res.json();
}

export async function fetchByName(name) {
  const res = await fetch(`${BASE_URL}/name/${name}`);
  return res.json();
}

export async function fetchByRegion(region) {
  const res = await fetch(`${BASE_URL}/region/${region}`);
  return res.json();
}

export async function fetchByCode(code) {
  const res = await fetch(`${BASE_URL}/alpha/${code}`);
  return res.json();
}
