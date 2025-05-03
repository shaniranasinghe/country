import React, { useEffect, useState } from "react";
import { fetchAllCountries, fetchByName, fetchByRegion } from "../utils/api";
import FilterBar from "../components/FilterBar";
import CountryList from "../components/CountryList";

function Home() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let fetchFn;
    if (search) {
      fetchFn = () => fetchByName(search);
    } else if (region) {
      fetchFn = () => fetchByRegion(region);
    } else {
      fetchFn = fetchAllCountries;
    }
    fetchFn()
      .then(data => {
        let filtered = Array.isArray(data) ? data : [];
        if (language) {
          filtered = filtered.filter(c =>
            c.languages && Object.values(c.languages).includes(language)
          );
        }
        setCountries(filtered);
      })
      .catch(() => setCountries([]))
      .finally(() => setLoading(false));
  }, [search, region, language]);

  return (
    <main className="container mx-auto px-4">
      <FilterBar
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
        language={language}
        setLanguage={setLanguage}
        onClearCache={() => window.location.reload()} // Example
      />
      {loading ? <p>Loading...</p> : <CountryList countries={countries} />}
    </main>
  );
}

export default Home;
