import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import HotelCard from '../components/HotelCard';

// Denna komponent hanterar nu allt för startsidan:
// 1. Håller reda på vad användaren söker efter.
// 2. Renderar sökformuläret.
// 3. Hämtar och visar hotellistan.
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_HOTEL_API_KEY;

  const handleSearch = (searchedCity) => {
    setSearchQuery(searchedCity);
  };

  const fetchHotels = async (query) => {
    if (!query) return; // Gör ingen sökning om fältet är tomt

    setLoading(true);
    setError(null);
    setHotels([]);

    try {
      const params = new URLSearchParams({
        engine: 'google_hotels',
        q: query,
        check_in_date: '2025-09-15',
        check_out_date: '2025-09-17',
        api_key: API_KEY,
      });

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setHotels(data.properties || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      
      <div className="p-4">
        {loading && <p className="text-center text-lg">Laddar hotell...</p>}
        {error && <p className="text-center text-lg text-red-600">Fel: {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map((hotel, index) => (
            <HotelCard key={hotel.gps_coordinates || index} hotel={hotel} />
          ))}
        </div>
      </div>
    </>
  );
}