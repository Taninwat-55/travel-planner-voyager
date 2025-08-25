import { useState, useEffect, useCallback } from 'react';
import HotelCard from './HotelCard';

export default function HotelList({ city, check_in_date, check_out_date }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_HOTEL_API_KEY;

  const fetchHotels = useCallback(async () => {
    setLoading(true);
    setError(null);
    setHotels([]);

    try {
      const params = new URLSearchParams({
        engine: 'google_hotels',
        q: city,
        check_in_date,
        check_out_date,
        api_key: API_KEY,
      });

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setHotels(data.properties || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [city, check_in_date, check_out_date, API_KEY]);

  useEffect(() => {
    if (city && check_in_date && check_out_date) {
      fetchHotels();
    }
  }, [fetchHotels, city, check_in_date, check_out_date]);

  if (loading) return <p className='text-center text-lg'>Laddar hotell...</p>;
  if (error)
    return <p className='text-center text-lg text-red-600'>Fel: {error}</p>;
  if (!city) return null;
  if (hotels.length === 0)
    return <p className='text-center text-lg'>Inga hotell hittades.</p>;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
      {hotels.map((hotel) => (
        <HotelCard key={hotel.data_id} hotel={hotel} />
      ))}
    </div>
  );
}
