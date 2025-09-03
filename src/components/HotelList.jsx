import { useState, useEffect, useCallback } from 'react';
import HotelCard from './HotelCard';
import SortOptions from './SortOptions';

export default function HotelList({
  city,
  check_in_date,
  check_out_date,
  onReviewClick,
}) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('relevance');

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

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('API-key is not valid or missing');
        } else {
          throw new Error(
            `Server Error: ${response.status} ${response.statusText}`
          );
        }
      }

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setHotels(data.properties || []);
    } catch (err) {
      if (err.name === 'TypeError') {
        setError(
          'Network Error: Could not connect to the server. Check your internet connection.'
        );
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [city, check_in_date, check_out_date, API_KEY]);

  useEffect(() => {
    if (city && check_in_date && check_out_date) {
      fetchHotels();
    }
  }, [fetchHotels, city, check_in_date, check_out_date]);

  const extractPrice = (priceString) => {
    if (!priceString) return 0;
    const numericString = priceString.toString().replace(/[^\d.,]/g, '');
    const cleanedString = numericString.replace(/\s/g, '').replace(',', '.');
    return parseFloat(cleanedString) || 0;
  };

  if (error) {
    return (
      <div className='text-center p-8 bg-red-50 border border-red-200 rounded-lg'>
        <p className='text-lg text-red-700 font-semibold'>Något gick fel</p>
        <p className='text-red-600 mt-2'>{error}</p>
        <button
          onClick={fetchHotels}
          className='mt-4 px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition'
        >
          Försök igen
        </button>
      </div>
    );
  }

  if (loading) return <p className='text-center text-lg'>Laddar hotell...</p>;
  if (error)
    return <p className='text-center text-lg text-red-600'>Fel: {error}</p>;
  if (!city) return null;
  if (hotels.length === 0)
    return <p className='text-center text-lg'>Inga hotell hittades.</p>;

  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortOrder === 'lowToHigh' || sortOrder === 'highToLow') {
      const priceA = extractPrice(a.rate_per_night?.lowest);
      const priceB = extractPrice(b.rate_per_night?.lowest);

      if (priceA === 0 && priceB === 0) return 0;
      if (priceA === 0) return 1;
      if (priceB === 0) return -1;

      return sortOrder === 'lowToHigh' ? priceA - priceB : priceB - priceA;
    }

    if (sortOrder === 'rating') {
      const ratingA = a.overall_rating || 0;
      const ratingB = b.overall_rating || 0;
      return ratingB - ratingA; // högst till lägst
    }

    // Relevans / default
    return 0;
  });

  return (
    <div className='min-h-screen py-6 px-4 md:px-6'>
      <div className='max-w-6xl mx-auto'>
        <SortOptions value={sortOrder} onChange={setSortOrder} />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {sortedHotels.map((hotel, index) => (
            <HotelCard
              key={hotel.data_id || `hotel-${index}`}
              hotel={hotel}
              onReviewClick={onReviewClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
