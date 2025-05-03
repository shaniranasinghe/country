import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchByCode } from "../utils/api";
import CountryDetail from "../components/CountryDetail";

function Details() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchByCode(code)
      .then(data => setCountry(data[0]))
      .catch(() => setCountry(null))
      .finally(() => setLoading(false));
  }, [code]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-14">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <Link
          to="/"
          className="mb-6 self-start px-5 py-2 bg-white/80 rounded-lg shadow-md text-gray-600 hover:bg-blue-100 transition text-base font-semibold border border-blue-100"
        >
          ← Back to Countries
        </Link>
        {loading ? (
          <div className="text-center text-xl text-blue-500 mt-16">Loading...</div>
        ) : (
          <CountryDetail country={country} />
        )}
      </div>
    </main>

  );
}

export default Details;
