import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import React from 'react';

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Save the image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      const allUsers = JSON.parse(localStorage.getItem('users')) || {};
      const user = allUsers[username];

      if (user && user.password === password) {
        login(username);
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } else {
      setError('Both fields are required');
    }
  };

  const handleRegister = () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const allUsers = JSON.parse(localStorage.getItem('users')) || {};
    if (allUsers[username]) {
      setError('Username already exists');
    } else {
      allUsers[username] = {
        password,
        favorites: [],
        profileImage
      };
      localStorage.setItem('users', JSON.stringify(allUsers));
      login(username);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center border border-blue-100">
        {/* Globe Icon */}
        <div className="bg-blue-100 rounded-full p-4 flex items-center justify-center mb-4 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" fill="#3b82f6" opacity="0.15"/><path stroke="#3b82f6" strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2" fill="none"/></svg>
        </div>
        {isRegister ? (
          <>
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-2 flex items-center gap-2">Create an Account</h2>
            <p className="text-center text-gray-500 mb-6">Join World Explorer and discover countries around the globe</p>
            <div className="w-full">
              <div className="mb-4">
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full bg-transparent outline-none text-gray-700"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0v4m0 4h.01" /></svg>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-transparent outline-none text-gray-700"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0v4m0 4h.01" /></svg>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full bg-transparent outline-none text-gray-700"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-6 w-full flex flex-col items-center">
                <label className="block text-gray-700 mb-2 text-center">Profile Image (optional)</label>
                <label htmlFor="profileImageUpload" className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8zm6 8v-2a6 6 0 00-12 0v2" /></svg>
                  Choose Image
                </label>
                <input
                  id="profileImageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {profileImage && (
                  <img
                    src={profileImage}
                    alt="Profile Preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 mt-2"
                  />
                )}
              </div>
              {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
              <button
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition mb-4 shadow-md"
                onClick={handleRegister}
              >
                Create Account
              </button>
            </div>
            <div className="flex items-center w-full my-2">
              <hr className="flex-grow border-gray-200" />
              <span className="mx-2 text-gray-400">Already have an account?</span>
              <hr className="flex-grow border-gray-200" />
            </div>
            <button
              className="flex items-center gap-2 border border-blue-400 text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition shadow-sm"
              onClick={() => setIsRegister(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Sign in
            </button>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-2 flex items-center gap-2">
              Welcome<span role="img" aria-label="globe">🌍</span>
            </h2>
            <p className="text-center text-gray-500 mb-6">Sign in to explore the world of countries</p>
            <div className="w-full">
              <div className="mb-4">
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full bg-transparent outline-none text-gray-700"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0v4m0 4h.01" /></svg>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-transparent outline-none text-gray-700"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
              <button
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition mb-4 shadow-md"
                onClick={handleLogin}
                aria-label="Login"
              >
                Login
              </button>
            </div>
            <p className="text-gray-500 text-base mt-2 mb-2">Don't have an account?</p>
            <button
              className="flex items-center gap-2 border border-blue-400 text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition shadow-sm"
              onClick={() => setIsRegister(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8zm6 8v-2a6 6 0 00-12 0v2" /></svg>
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;