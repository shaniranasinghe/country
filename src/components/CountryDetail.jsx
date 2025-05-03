import { FaUsers, FaGlobeEurope, FaLandmark, FaMapMarkerAlt } from "react-icons/fa";

function CountryDetail({ country }) {
  if (!country) return <div className="text-red-500">Country not found.</div>;

  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    languages,
    currencies,
    timezones,
    borders,
  } = country;

  const getLanguages = () => languages ? Object.values(languages) : [];
  const getCurrencies = () =>
    currencies ? Object.values(currencies).map(cur => `${cur.name} (${cur.symbol})`) : [];
  const getBorderCountries = () => borders || [];

  // Example flag meaning (replace with actual data if available)
  const flagMeaning =
    "The flag of Greece is composed of nine equal horizontal bands of blue alternating with white. A blue square bearing a white cross is superimposed in the canton.";

  return (
    <section className="
      max-w-5xl w-full mx-auto
      bg-white/80
      rounded-2xl
      shadow-2xl
      backdrop-blur
      border border-blue-100
      overflow-hidden
      mt-4
      transition
      hover:shadow-[0_8px_40px_0_rgba(80,80,200,0.18)]
    ">
      {/* Flag Banner */}
      <div className="relative w-full h-60 sm:h-72 md:h-80 overflow-hidden rounded-t-2xl">
        <img src={flags?.svg} alt={name?.common} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-transparent" />
        <div className="absolute left-0 bottom-0 w-full px-10 pb-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {name?.common}
          </h2>
          <span className="text-lg md:text-xl text-blue-100 font-medium">
            {name?.official}
          </span>
        </div>
      </div>

      {/* Add positive margin-top here */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-10 mt-12 relative z-10">
        {/* Stat boxes */}
      </div>


      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-10 -mt-10 relative z-10">
        <div className="flex flex-col items-center bg-blue-50 rounded-xl p-5 text-center shadow hover:shadow-md transition hover:-translate-y-1">
          <FaUsers className="text-blue-400 text-2xl mb-1" />
          <div className="text-xs text-blue-500 font-medium">Population</div>
          <div className="font-extrabold text-2xl text-blue-900">{population?.toLocaleString()}</div>
        </div>
        <div className="flex flex-col items-center bg-purple-50 rounded-xl p-5 text-center shadow hover:shadow-md transition hover:-translate-y-1">
          <FaGlobeEurope className="text-purple-400 text-2xl mb-1" />
          <div className="text-xs text-purple-500 font-medium">Region</div>
          <div className="font-extrabold text-xl text-purple-900">{region}</div>
        </div>
        <div className="flex flex-col items-center bg-pink-50 rounded-xl p-5 text-center shadow hover:shadow-md transition hover:-translate-y-1">
          <FaLandmark className="text-pink-400 text-2xl mb-1" />
          <div className="text-xs text-pink-500 font-medium">Capital</div>
          <div className="font-extrabold text-xl text-pink-900">{capital?.[0]}</div>
        </div>
        <div className="flex flex-col items-center bg-yellow-50 rounded-xl p-5 text-center shadow hover:shadow-md transition hover:-translate-y-1">
          <FaMapMarkerAlt className="text-yellow-400 text-2xl mb-1" />
          <div className="text-xs text-yellow-500 font-medium">Subregion</div>
          <div className="font-extrabold text-xl text-yellow-900">{subregion}</div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-10 py-10">
        <div className="bg-white/70 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Languages</div>
          <div>
            {getLanguages().map(lang => (
              <span key={lang} className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 mr-2 text-xs font-medium mb-1 border border-blue-200 shadow-sm">
                {lang}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white/70 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Timezones</div>
          <div>
            {timezones?.map(tz => (
              <span key={tz} className="inline-block bg-pink-100 text-pink-700 rounded-full px-3 py-1 mr-2 text-xs font-medium mb-1 border border-pink-200 shadow-sm">
                {tz}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white/70 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Currencies</div>
          <div>
            {getCurrencies().map(cur => (
              <span key={cur} className="inline-block bg-green-100 text-green-700 rounded-full px-3 py-1 mr-2 text-xs font-medium mb-1 border border-green-200 shadow-sm">
                {cur}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white/70 rounded-xl p-5 shadow-sm">
          <div className="text-xs text-gray-500 mb-1">Flag Meaning</div>
          <div className="text-gray-700 text-sm">{flagMeaning}</div>
        </div>
      </div>

      {/* Border Countries */}
      <div className="px-10 pb-8">
        <div className="text-xs text-gray-500 mb-2">Border Countries</div>
        <div>
          {getBorderCountries().length === 0 ? (
            <span className="text-gray-400 text-sm">None</span>
          ) : (
            getBorderCountries().map(code => (
              <span
                key={code}
                className="inline-block bg-gray-100 text-gray-700 rounded-full px-4 py-1 mr-2 mb-2 text-xs font-semibold border border-gray-200 shadow hover:bg-blue-100 hover:text-blue-700 transition cursor-pointer"
              >
                {code}
              </span>
            ))
          )}
        </div>
      </div>     
    </section>
  );
}

export default CountryDetail;
