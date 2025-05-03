import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";

function CountryCard({ country }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleFavorite = (e) => {
    e.preventDefault();
    isFavorite(country) ? removeFavorite(country) : addFavorite(country);
  };

  const handleExplore = (e) => {
    e.preventDefault();
    navigate(`/country/${country.cca3}`);
  };

  const formatNumber = n => n > 1e6 ? (n / 1e6).toFixed(1) + "M" : n > 1e3 ? (n / 1e3).toFixed(1) + "K" : n;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col relative min-h-[350px]">
      <div className="relative">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-full h-32 object-cover rounded-t-xl mb-2"
        />
        <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-semibold flex items-center shadow">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
          {formatNumber(country.area)} km<sup>2</sup>
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-lg mb-1">{country.name.common}</h2>
          <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || "N/A"}</p>
          <p><span className="font-semibold">Region:</span> {country.region}</p>
          <p><span className="font-semibold">Languages:</span> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
          <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={handleExplore}
            className="text-green-600 font-semibold hover:underline"
          >
            Explore
          </button>
          <button onClick={handleFavorite} aria-label="Favorite">
            {isFavorite(country) ? (
              <FaHeart className="text-green-600 text-xl" />
            ) : (
              <FaRegHeart className="text-green-600 text-xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;
