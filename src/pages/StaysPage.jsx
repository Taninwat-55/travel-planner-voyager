import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_HOTEL_API_KEY;

export default function Stays() {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    if (search.length > 2) {
      fetchHotels(search);
    }
  }, [search]);

 const fetchHotels = async (city) => {
  try {
    const response = await fetch(
      `https://serpapi.com/hotels?city=${city}&apikey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setHotels(data.hotels || []);
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
};


  return (
    <div className="bg-white text-black px-20 py-20 w-full min-h-screen">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Sök"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-50% border border-gray-200 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-300 mb-6">
        {['overview', 'reviews', 'about'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 capitalize ${
              activeTab === tab
                ? 'border-b-2 border-orange-500 text-black font-semibold'
                : 'text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-xl font-semibold mb-3"></h2>
            <p className="text-gray-700 leading-relaxed mb-6"></p>
            <h3 className="text-lg font-semibold mb-3"></h3>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {hotels.length > 0 ? (
                hotels.map((hotel, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-100 rounded-xl p-4 shadow-md"
                  >
                    <div>
                      <h4 className="font-bold text-lg">{hotel.name}</h4>
                      <p className="text-sm text-gray-600">
                        ⭐ {hotel.rating} • {hotel.reviews} recensioner •{' '}
                        {hotel.distance} km från centrum
                      </p>
                      <span className="inline-block mt-2 bg-orange-500 text-white px-3 py-1 rounded-lg font-semibold">
                        ${hotel.price}
                      </span>
                    </div>
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-28 h-20 rounded-lg object-cover"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic"></p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-xl font-semibold">recensioner</h2>
            <p className="text-gray-600 mt-2">Inga tillgängliga recensioner.</p>
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <h2 className="text-xl font-semibold">Om</h2>
            <p className="text-gray-600 mt-2">
              Voyager hjälper dig att hitta de bästa hotellen, flygen och
              biluthyrningarna – enkelt och smidigt.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
