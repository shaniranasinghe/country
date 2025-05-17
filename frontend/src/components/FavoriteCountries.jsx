import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

function FavoriteCountries({ username }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[username];
    if (user) {
      setFavorites(user.favorites || []);
    }
  }, [username]);

  const toggleFavorite = (country) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[username];
    if (!user) return;

    if (user.favorites.includes(country)) {
      user.favorites = user.favorites.filter((fav) => fav !== country);
    } else {
      user.favorites.push(country);
    }

    users[username] = user;
    localStorage.setItem('users', JSON.stringify(users));
    setFavorites(user.favorites);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Your Favorite Countries
        </h2>
        {favorites.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favorites.map((country) => (
              <li
                key={country}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-md flex justify-between items-center"
              >
                <span className="text-lg font-medium text-gray-800">
                  {country}
                </span>
                <button
                  onClick={() => toggleFavorite(country)}
                  className="text-2xl focus:outline-none"
                >
                  {favorites.includes(country) ? (
                    <FaStar className="text-yellow-500" />
                  ) : (
                    <FaRegStar className="text-gray-400" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">
            You have no favorite countries yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default FavoriteCountries;