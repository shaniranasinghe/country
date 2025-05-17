import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaSignOutAlt, FaCamera, FaTrash, FaUserCircle } from 'react-icons/fa';
import Header from '../components/Header'; // Import the Header component

function Profile() {
  const { user, logout, updateProfileImage } = useUser();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [profileImage, setProfileImage] = useState(null); // Default to null

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem('users')) || {};
    const currentUser = allUsers[user.username];
    if (currentUser) {
      setFavorites(currentUser.favorites || []);
      setProfileImage(currentUser.profileImage || null); // Use null if no image
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const allUsers = JSON.parse(localStorage.getItem('users')) || {};
        const currentUser = allUsers[user.username];
        currentUser.profileImage = reader.result; // Save the image as a base64 string
        allUsers[user.username] = currentUser;
        localStorage.setItem('users', JSON.stringify(allUsers));
        setProfileImage(reader.result);
        updateProfileImage(reader.result); // Update the context
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    const allUsers = JSON.parse(localStorage.getItem('users')) || {};
    const currentUser = allUsers[user.username];
    if (currentUser) {
      delete currentUser.profileImage; // Remove the profile image
      allUsers[user.username] = currentUser;
      localStorage.setItem('users', JSON.stringify(allUsers));
      setProfileImage(null); // Clear the state
      updateProfileImage(null); // Update the context
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Add the Header component */}
      <Header onToggleFavorites={() => {}} />

      <div className="max-w-4xl mx-auto bg-blue-100 shadow-lg rounded-lg p-8 mt-6">
        {/* Backward Navigation */}
        <button
          onClick={() => navigate(-1)} // Navigate to the previous page
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Welcome, {user?.username}!
        </h1>

        {/* Profile Image Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-blue-600"
              />
            ) : (
              <FaUserCircle className="w-32 h-32 text-gray-400" />
            )}
            <label
              htmlFor="profileImageUpload"
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer"
            >
              <FaCamera />
              <span className="sr-only">Choose Image</span>
            </label>
            <input
              id="profileImageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {profileImage && (
            <button
              onClick={handleImageDelete}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-2"
            >
              <FaTrash />
              Delete Image
            </button>
          )}

          <p className="text-lg text-gray-700 mt-4">
            <strong>Favorites:</strong> {favorites.length} countries
          </p>
          <button
            className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition mt-4"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Your Favorite Countries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {favorites.length > 0 ? (
            favorites.map((countryCode) => (
              <div
                key={countryCode}
                className="bg-blue-200 border border-blue-300 rounded-lg p-4 shadow-md flex items-center justify-between"
              >
                <span className="text-lg font-medium text-gray-800">
                  {countryCode}
                </span>
                <FaHeart className="text-red-500 text-xl" />
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No favorite countries added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;