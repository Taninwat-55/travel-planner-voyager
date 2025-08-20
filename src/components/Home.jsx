import { useState, useEffect } from 'react';

export default function HotelFetch() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_HOTEL_API_KEY;

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        engine: 'google_hotels',
        q: 'Stockholm, Sweden',
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
    fetchHotels();
  }, []); 

  return (
    <div>
      {loading && <p>Laddar hotell...</p>}
      {error && <p style={{ color: 'red' }}>Fel: {error}</p>}

      <div>
        {hotels.map((hotel, index) => (
          <div key={index}>
            {hotel.images?.[0] && (
              <img src={hotel.images[0].thumbnail} alt={hotel.name} />
            )}
            <h3>{hotel.name}</h3>
            <p>15-17 September 2025</p>
            {hotel.rate_per_night && (
              <p>{hotel.rate_per_night.lowest} per natt</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
