import React from 'react';

function FilterBar({ onRegionChange, onLanguageChange, onPopulationChange, regions, languages }) {
  return (
    <div className="flex flex-wrap gap-4 justify-between items-center my-4">
      <select
        className="p-2 border rounded shadow-sm"
        onChange={(e) => onRegionChange(e.target.value)}
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <select
        className="p-2 border rounded shadow-sm"
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="">Filter by Language</option>
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>

      <select
        className="p-2 border rounded shadow-sm"
        onChange={(e) => onPopulationChange(e.target.value)}
      >
        <option value="">Filter by Population</option>
        <option value="small">Less than 1M</option>
        <option value="medium">1M - 10M</option>
        <option value="large">10M - 100M</option>
        <option value="veryLarge">More than 100M</option>
      </select>
    </div>
  );
}

export default FilterBar;