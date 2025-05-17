import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCountryByCode } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import Header from '../components/Header';
import React from 'react';
import { FaUsers, FaGlobeAfrica, FaLandmark, FaMapMarkerAlt, FaLanguage, FaClock, FaRulerCombined, FaMoneyBillWave, FaFlag } from 'react-icons/fa';

function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [user, setUser] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCountryByCode(code);
        setCountry(res[0]); // API returns an array
      } catch (err) {
        console.error('Error loading country:', err);
      }
    };
    fetchData();
  }, [code]);

  useEffect(() => {
    const username = localStorage.getItem('user');
    if (username) {
      const allUsers = JSON.parse(localStorage.getItem('users')) || {};
      setUser(allUsers[username]);
    }
  }, []);

  useEffect(() => {
    const fetchBorderCountries = async () => {
      if (country?.borders?.length) {
        try {
          const borderData = await Promise.all(
            country.borders.map((borderCode) => getCountryByCode(borderCode))
          );
          setBorderCountries(borderData.map((res) => res[0].name.common));
        } catch (err) {
          console.error('Error fetching border countries:', err);
        }
      }
    };
    if (country) {
      fetchBorderCountries();
    }
  }, [country]);

  const handleFavoriteToggle = () => {
    const username = localStorage.getItem('user');
    if (!username) return;

    const allUsers = JSON.parse(localStorage.getItem('users')) || {};
    const user = allUsers[username];

    if (user.favorites.includes(country.cca3)) {
      user.favorites = user.favorites.filter((code) => code !== country.cca3);
    } else {
      user.favorites.push(country.cca3);
    }

    allUsers[username] = user;
    localStorage.setItem('users', JSON.stringify(allUsers));
    setUser(user);
  };

  if (!country) {
    return (
      <motion.p
        className="text-center mt-6 text-lg text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading country details...
      </motion.p>
    );
  }

  return (
    <div>
      <Header onToggleFavorites={() => {}} />
      <motion.div
        className="max-w-6xl mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/"
          className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          ← Back
        </Link>

        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Left Section: Flag and Details */}
          <motion.div
            className="flex-1 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="rounded-lg shadow-md mb-4"
            />
            <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">
              {country.name.common}
            </h1>
            <button
              onClick={handleFavoriteToggle}
              className={`mt-4 px-6 py-2 rounded-full text-white ${
                user?.favorites.includes(country.cca3)
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {user?.favorites.includes(country.cca3)
                ? 'Remove from Favorites'
                : 'Add to Favorites'}
            </button>
          </motion.div>

          {/* Right Section: Details */}
          <motion.div
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-4 bg-blue-50 rounded-lg shadow-md flex items-center gap-4">
              <FaUsers className="text-3xl text-blue-400" />
              <div>
                <p className="text-lg font-semibold text-gray-700">Population</p>
                <p className="text-gray-600">{country.population.toLocaleString()}</p>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg shadow-md flex items-center gap-4">
              <FaGlobeAfrica className="text-3xl text-purple-400" />
              <div>
                <p className="text-lg font-semibold text-gray-700">Region</p>
                <p className="text-gray-600">{country.region}</p>
              </div>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg shadow-md flex items-center gap-4">
              <FaLandmark className="text-3xl text-pink-400" />
              <div>
                <p className="text-lg font-semibold text-gray-700">Capital</p>
                <p className="text-gray-600">{country.capital?.[0]}</p>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg shadow-md flex items-center gap-4">
              <FaMapMarkerAlt className="text-3xl text-yellow-400" />
              <div>
                <p className="text-lg font-semibold text-gray-700">Subregion</p>
                <p className="text-gray-600">{country.subregion}</p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg shadow-md flex items-center gap-4">
              <FaLanguage className="text-3xl text-blue-400" />
              <div>
                <p className="text-lg font-semibold text-gray-700">Languages</p>
                <p className="text-gray-600">
                  {Object.values(country.languages || {}).join(', ')}
                </p>
              </div>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg shadow-md flex items-center gap-4">
              <FaClock className="text-3xl text-pink-400" />
              <div>
                <p className="text-lg font-semibold text-gray-700">Timezones</p>
                <p className="text-gray-600">{country.timezones.join(', ')}</p>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg shadow-md flex items-center gap-4">
              <FaRulerCombined className="text-3xl text-yellow-400" />
              <div>
                <p className="text-lg font-semibold text-gray-700">Area</p>
                <p className="text-gray-600">{country.area.toLocaleString()} km²</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg shadow-md flex items-center gap-4">
              <FaMoneyBillWave className="text-3xl text-green-400" />
              <div>
                <p className="text-lg font-semibold text-gray-700">Currency</p>
                <p className="text-gray-600">
                  {Object.values(country.currencies || {})
                    .map((c) => c.name)
                    .join(', ')}
                </p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-md flex items-center gap-4">
              <FaFlag className="text-3xl text-gray-400" />
              <div>
                <p className="text-lg font-semibold text-gray-700">Border Countries</p>
                <p className="text-gray-600">
                  {borderCountries.length > 0
                    ? borderCountries.join(', ')
                    : 'No border countries'}
                </p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-700">Official Name</p>
              <p className="text-gray-600" data-testid="official-name">{country.name.official}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Location on Map
          </h2>
          <div className="rounded-lg shadow-md overflow-hidden border border-gray-300">
            <MapContainer
              center={country.latlng}
              zoom={6}
              style={{ height: '500px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={country.latlng}>
                <Popup>{country.name.common}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CountryDetail;