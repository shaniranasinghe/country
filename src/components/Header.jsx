import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow p-4 mb-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-700 cursor-pointer" onClick={() => navigate("/")}>
        REST Countries Explorer
      </h1>
      <nav className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        {user ? (
          <>
            <span className="text-gray-700">Hello, {user.username}</span>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
