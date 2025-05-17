import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const savedTimestamp = localStorage.getItem('sessionTimestamp');
    const allUsers = JSON.parse(localStorage.getItem('users')) || {};
    if (savedUser && savedTimestamp && Date.now() - savedTimestamp < SESSION_TIMEOUT) {
      const currentUser = allUsers[savedUser];
      return { username: savedUser, profileImage: currentUser?.profileImage || null };
    }
    localStorage.removeItem('user');
    localStorage.removeItem('sessionTimestamp');
    return null;
  });

  const login = (username) => {
    const allUsers = JSON.parse(localStorage.getItem('users')) || {};
    const currentUser = allUsers[username];
    localStorage.setItem('user', username);
    localStorage.setItem('sessionTimestamp', Date.now());
    setUser({ username, profileImage: currentUser?.profileImage || null });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('sessionTimestamp');
    setUser(null);
  };

  const updateProfileImage = (profileImage) => {
    setUser((prevUser) => ({ ...prevUser, profileImage }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const savedTimestamp = localStorage.getItem('sessionTimestamp');
      if (savedTimestamp && Date.now() - savedTimestamp >= SESSION_TIMEOUT) {
        logout();
      }
    }, 1000); // Check every second
    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, updateProfileImage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);