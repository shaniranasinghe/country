import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute> }/>
          <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
          <Route
            path="/country/:code"
            element={
              <PrivateRoute>
                <Details />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
