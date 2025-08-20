import { useState, useEffect } from 'react';

export default function HotelList({ query }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_HOTEL_API_KEY;

  const fetchHotels = async (searchQuery) => {
    setLoading(true);
    setError(null);
    setHotels([]);

    try {
      const params = new URLSearchParams({
        engine: 'google_hotels',
        q: searchQuery,
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
    if (query) {
      fetchHotels(query);
    }
  }, [query]);

  return (
    <div className='p-4'>
      {loading && <p className='text-center text-lg'>Laddar hotell...</p>}
      {error && (
        <p className='text-center text-lg text-red-600'>Fel: {error}</p>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {hotels.map((hotel, index) => (
          <div
            key={hotel.gps_coordinates || index}
            className='bg-white rounded-lg shadow-md overflow-hidden'
          >
            {hotel.images?.[0] && (
              <img
                src={hotel.images[0].thumbnail}
                alt={hotel.name}
                className='w-full h-48 object-cover'
              />
            )}
            <div className='p-4'>
              <h3 className='text-xl font-bold'>{hotel.name}</h3>
              <p className='text-gray-600'>15-17 September 2025</p>
              {hotel.rate_per_night && (
                <p className='font-semibold mt-2'>
                  {hotel.rate_per_night.lowest} per natt
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
