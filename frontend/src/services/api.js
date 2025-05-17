import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
};

export const getCountryByName = async (name) => {
  const response = await axios.get(`${BASE_URL}/name/${name}`);
  return response.data;
};

export const getCountriesByRegion = async (region) => {
  const response = await axios.get(`${BASE_URL}/region/${region}`);
  return response.data;
};

export const getCountryByCode = async (code) => {
  const response = await axios.get(`${BASE_URL}/alpha/${code}`);
  return response.data;
};