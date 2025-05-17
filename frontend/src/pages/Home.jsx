import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CountryCard from '../components/CountryCard';
import { getAllCountries, getCountryByName, getCountriesByRegion, getCountryByCode } from '../services/api';

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [topRegions, setTopRegions] = useState([]);
  const [topLanguages, setTopLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPopulation, setSelectedPopulation] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);

        // Calculate top 5 regions
        const regionCounts = data.reduce((acc, country) => {
          acc[country.region] = (acc[country.region] || 0) + 1;
          return acc;
        }, {});
        const sortedRegions = Object.entries(regionCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([region]) => region);
        setTopRegions(sortedRegions);

        // Calculate top 5 languages
        const languageCounts = data.reduce((acc, country) => {
          Object.values(country.languages || {}).forEach((language) => {
            acc[language] = (acc[language] || 0) + 1;
          });
          return acc;
        }, {});
        const sortedLanguages = Object.entries(languageCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([language]) => language);
        setTopLanguages(sortedLanguages);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Failed to load countries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePopulationChange = (populationRange) => {
    console.log('Selected Population Range:', populationRange);
    setSelectedPopulation(populationRange);
  };

  const handleViewDetails = async (code) => {
    try {
      const countryDetails = await getCountryByCode(code);
      console.log('Country Details:', countryDetails); // Debugging
      navigate(`/country/${code}`, { state: { country: countryDetails } });
    } catch (err) {
      console.error('Error fetching country details:', err);
      setError('Failed to fetch country details. Please try again.');
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const data = await getCountryByName(query);
        // Filter the results further by the selected region if applicable
        const filteredByRegion = selectedRegion
          ? data.filter((country) => country.region === selectedRegion)
          : data;
        setFilteredCountries(filteredByRegion);
      } catch (err) {
        console.error('Error searching country by name:', err);
        setError('Failed to search for the country. Please try again.');
      }
    } else {
      // Reset to region-filtered countries if no search query
      if (selectedRegion) {
        const data = await getCountriesByRegion(selectedRegion);
        setFilteredCountries(data);
      } else {
        setFilteredCountries(countries);
      }
    }
  };

  const handleRegionChange = async (region) => {
    setSelectedRegion(region);
    setSearchQuery(''); // Reset the search query when changing the region
    if (region) {
      try {
        const data = await getCountriesByRegion(region);
        setFilteredCountries(data);
      } catch (err) {
        console.error('Error fetching countries by region:', err);
        setError('Failed to filter countries by region. Please try again.');
      }
    } else {
      setFilteredCountries(countries);
    }
  };

  useEffect(() => {
    let results = [...countries];

    if (showFavorites) {
      const username = localStorage.getItem('user');
      const allUsers = JSON.parse(localStorage.getItem('users')) || {};
      const user = allUsers[username];
      if (user) {
        results = results.filter((country) => user.favorites.includes(country.cca3));
      }
    }

    results = results
      .filter((country) =>
        searchQuery
          ? country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
          : true
      )
      .filter((country) => (selectedRegion ? country.region === selectedRegion : true))
      .filter((country) =>
        selectedLanguage
          ? Object.values(country.languages || {}).includes(selectedLanguage)
          : true
      )
      .filter((country) => {
        if (!selectedPopulation) return true;
        const population = country.population;
        if (selectedPopulation === 'small') return population < 1_000_000;
        if (selectedPopulation === 'medium') return population >= 1_000_000 && population <= 10_000_000;
        if (selectedPopulation === 'large') return population > 10_000_000 && population <= 100_000_000;
        if (selectedPopulation === 'veryLarge') return population > 100_000_000;
        return true;
      });

    setFilteredCountries(results);
  }, [searchQuery, selectedRegion, selectedLanguage, selectedPopulation, countries, showFavorites]);

  if (loading) {
    return <p className="text-center mt-6">Loading countries...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-6">{error}</p>;
  }

  return (
    <div>
      <Header onToggleFavorites={setShowFavorites} />
      <div className="max-w-6xl mx-auto px-4">
        <SearchBar onSearch={handleSearch} />
        <FilterBar
          onRegionChange={handleRegionChange}
          onLanguageChange={setSelectedLanguage}
          onPopulationChange={handlePopulationChange}
          regions={topRegions}
          languages={topLanguages}
        />
        <div id="country-list" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filteredCountries?.length > 0 ? (
            filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                onViewDetails={() => handleViewDetails(country.cca3)}
              />
            ))
          ) : (
            <p className="text-center col-span-full">No countries found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;