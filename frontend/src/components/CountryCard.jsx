import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

function CountryCard({ country }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('user');
    if (username) {
      const allUsers = JSON.parse(localStorage.getItem('users')) || {};
      const user = allUsers[username];
      if (user?.favorites.includes(country.cca3)) {
        setIsFavorite(true);
      }
    }
  }, [country.cca3]);

  const handleFavoriteToggle = () => {
    const username = localStorage.getItem('user');
    if (!username) return;

    const allUsers = JSON.parse(localStorage.getItem('users')) || {};
    const user = allUsers[username];

    if (isFavorite) {
      user.favorites = user.favorites.filter((code) => code !== country.cca3);
    } else {
      user.favorites.push(country.cca3);
    }

    allUsers[username] = user;
    localStorage.setItem('users', JSON.stringify(allUsers));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-green-50 shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-gray-200 hover:shadow-2xl">
      <div className="relative">
        {/* Area badge */}
        {country.area && (
          <div className="absolute top-4 left-4 z-10 flex items-center bg-white/90 rounded-full px-3 py-1 shadow text-xs font-semibold text-gray-800">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {country.area >= 100000 ? `${(country.area / 1000).toFixed(1)}K` : country.area.toLocaleString()} km
            <sup className="ml-0.5">2</sup>
          </div>
        )}
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-full h-40 object-cover"
        />
      </div>
      {/* Country Details */}
      <div className="p-6">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-tight flex items-center gap-2">
          <span className="truncate">{country.name.common}</span>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider" data-testid="region-badge">{country.region}</span>
        </h2>
        <div className="flex flex-col gap-1 text-black text-base font-medium">
          <span><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</span>
          <span><span className="font-semibold">Region:</span> <span data-testid="region-detail">{country.region}</span></span>
          <span><span className="font-semibold">Languages:</span> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</span>
          <span><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</span>
        </div>
      </div>
      {/* Favorite Button */}
      <div className="px-6 pb-6 pt-3 flex justify-between items-center bg-gradient-to-r from-white to-blue-50 border-t-0">
        <Link
          to={`/country/${country.cca3}`}
          className="text-base text-green-600 font-semibold hover:underline hover:text-green-800 transition-colors tracking-tight"
        >
          Explore
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleFavoriteToggle();
          }}
          className="text-2xl focus:outline-none hover:scale-110 transition-transform"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FaHeart
            className={isFavorite ? 'text-green-500 drop-shadow-lg' : 'text-gray-300 hover:text-green-400 transition-colors'}
          />
        </button>
      </div>
    </div>
  );
}

export default CountryCard;