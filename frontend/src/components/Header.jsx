import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaHeart, FaUserCircle } from 'react-icons/fa';
import React from 'react';

function Header({ onToggleFavorites }) {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleFavoritesClick = () => {
    const newState = !showFavorites;
    setShowFavorites(newState);
    onToggleFavorites(newState);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the Profile page
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg px-8 py-4 flex flex-col md:flex-row md:justify-between md:items-center border-b border-blue-100 gap-4 md:gap-0">
      {/* Left Section: Title */}
      <h1 className="order-1 md:order-1 text-3xl font-extrabold tracking-tight text-blue-700 flex items-center gap-2 select-none justify-center md:justify-start w-full md:w-auto">
        <span className="text-4xl">🌍</span>
        <span>Country Explorer</span>
      </h1>

      {/* Center Section: Home and Favorites Buttons */}
      <div className="order-2 md:order-2 flex items-center gap-4 w-full md:w-auto justify-center md:justify-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-sm border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-blue-50 text-blue-700 hover:bg-blue-100"
        >
          Home
        </button>
        <button
          onClick={handleFavoritesClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-sm border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none ${showFavorites ? 'bg-blue-100 text-blue-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
          aria-label="Favorites"
        >
          <FaHeart className={`text-xl ${showFavorites ? 'text-blue-500' : 'text-blue-400'}`} />
          Favorites
        </button>
      </div>

      {/* Right Section: User Menu */}
      <div className="order-3 flex justify-center md:justify-end w-full md:w-auto relative">
        {user ? (
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setShowMenu(!showMenu)}
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-600 shadow-sm"
              />
            ) : (
              <FaUserCircle className="w-10 h-10 text-blue-300 group-hover:text-blue-500 transition-colors" />
            )}
            <span className="text-lg font-semibold text-blue-900">{user.username}</span>
            <svg className={`w-4 h-4 ml-1 transition-transform ${showMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </div>
        ) : null}

        {showMenu && (
          <div className="absolute right-0 mt-2 bg-white text-blue-900 rounded-xl shadow-xl w-48 border border-blue-100 z-20 animate-fade-in">
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer rounded-t-xl transition-colors"
                onClick={handleProfileClick}
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer rounded-b-xl transition-colors"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;