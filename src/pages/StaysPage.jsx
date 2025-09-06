import { useState, useEffect } from 'react';
import DateRangePicker from '../components/DateRangePicker';
import dayjs from 'dayjs';

const API_KEY = import.meta.env.VITE_HOTEL_API_KEY;

export default function Stays() {
  const [activeTab, setActiveTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dates, setDates] = useState({
    checkIn: dayjs().add(7, 'day'),
    checkOut: dayjs().add(8, 'day'),
  });

  useEffect(() => {
    if (search.length > 2 && dates.checkIn && dates.checkOut) {
      fetchHotels(search, dates);
    } else {
      setHotels([]);
    }
  }, [search, dates]);

  const fetchHotels = async (city, searchDates) => {
    setLoading(true);
    setError(null);
    setHotels([]);

    try {
      const params = new URLSearchParams({
        engine: 'google_hotels',
        q: city,
        check_in_date: searchDates.checkIn.format('YYYY-MM-DD'),
        check_out_date: searchDates.checkOut.format('YYYY-MM-DD'),
        api_key: API_KEY,
      });

      const response = await fetch(`/api/search?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setHotels(data.properties || []);
    } catch (err) {
      console.error('Error fetching hotels:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white text-black px-20 py-20 w-full min-h-screen'>
      {/* Search Bar */}
      <div className='flex flex-col md:flex-row gap-4 mb-6 items-center'>
        <input
          type='text'
          placeholder='Sök'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full md:w-1/2 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400'
        />
        <DateRangePicker value={dates} onChange={setDates} />
      </div>

      {/* Tabs */}
      <div className='flex gap-6 border-b border-gray-300 mb-6'>
        {['översikt', 'recensioner', 'om'].map((tab) => (
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
      <div className='mb-8'>
        {activeTab === 'overview' && (
          <div>
            <div className='space-y-4 max-h-[60vh] overflow-y-auto pr-2'>
              {loading && <p>Loading hotels...</p>}
              {error && <p className='text-red-500'>Error: {error}</p>}
              {!loading &&
                !error &&
                hotels.length > 0 &&
                hotels.map((hotel) => (
                  <div
                    key={hotel.data_id}
                    className='flex justify-between items-center bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow'
                  >
                    <div className='flex-grow pr-4'>
                      <h4 className='font-bold text-lg'>{hotel.name}</h4>
                      {hotel.overall_rating && (
                        <p className='text-sm text-gray-600'>
                          ⭐ {hotel.overall_rating} ({hotel.reviews || 0}{' '}
                          reviews)
                        </p>
                      )}
                      {hotel.rate_per_night && (
                        <span className='inline-block mt-2 bg-orange-500 text-white px-3 py-1 rounded-lg font-semibold text-sm'>
                          {hotel.rate_per_night.lowest}
                        </span>
                      )}
                    </div>
                    {hotel.images?.[0]?.thumbnail && (
                      <img
                        src={hotel.images[0].thumbnail}
                        alt={hotel.name}
                        className='w-28 h-20 rounded-lg object-cover flex-shrink-0'
                      />
                    )}
                  </div>
                ))}
              {!loading &&
                !error &&
                hotels.length === 0 &&
                search.length > 2 && (
                  <p className='text-gray-500 italic'>
                    Inga hotell hittades för "{search}". Försök med en annan
                    stad.
                  </p>
                )}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h2 className='text-xl font-semibold'>recensioner</h2>
            <p className='text-gray-600 mt-2'>Inga tillgängliga recensioner.</p>
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <h2 className='text-xl font-semibold'>Om</h2>
            <p className='text-gray-600 mt-2'>
              Voyager hjälper dig att hitta de bästa hotellen, flygen och
              biluthyrningarna – enkelt och smidigt.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
