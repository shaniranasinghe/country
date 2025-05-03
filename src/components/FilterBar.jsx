import React from "react";

function FilterBar({ search, setSearch, region, setRegion, language, setLanguage, onClearCache }) {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const languages = ["English", "French", "Spanish", "Arabic", "Chinese", "Hindi", "Russian", "Portuguese"]; // Example

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
      <input
        type="text"
        placeholder="Search by country name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="p-2 border rounded w-full md:w-1/3"
      />
      <select
        value={region}
        onChange={e => setRegion(e.target.value)}
        className="p-2 border rounded w-full md:w-1/6"
      >
        <option value="">All Regions</option>
        {regions.map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        className="p-2 border rounded w-full md:w-1/6"
      >
        <option value="">All Languages</option>
        {languages.map(l => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600"
        onClick={onClearCache}
      >
        Clear Cache
      </button>
    </div>
  );
}

export default FilterBar;
