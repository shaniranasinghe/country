import React from "react";
import CountryCard from "./CountryCard";

function CountryList({ countries }) {
  if (!countries.length) return <p>No countries found.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {countries.map(country => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
}

export default CountryList;
