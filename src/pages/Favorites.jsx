import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import CountryList from "../components/CountryList";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">My Favorite Countries</h2>
      {favorites.length === 0 ? (
        <p>No favorite countries yet. Click the heart icon to add some!</p>
      ) : (
        <CountryList countries={favorites} />
      )}
    </main>
  );
}

export default Favorites;
