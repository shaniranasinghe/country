import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext"; // adjust path as needed

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when user changes
  useEffect(() => {
    if (user) {
      const fav = localStorage.getItem(`favorites_${user.username}`);
      setFavorites(fav ? JSON.parse(fav) : []);
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Save favorites to localStorage when favorites change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.username}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const addFavorite = (country) => {
    if (!favorites.some((c) => c.cca3 === country.cca3)) {
      setFavorites([...favorites, country]);
    }
  };

  const removeFavorite = (country) => {
    setFavorites(favorites.filter((c) => c.cca3 !== country.cca3));
  };

  const isFavorite = (country) => {
    return favorites.some((c) => c.cca3 === country.cca3);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
