import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import HotelList from '../components/HotelList';

export default function HomePage() {
  const [searchParams, setSearchParams] = useState(null);
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  // Restore search params from URL on component mount
  useEffect(() => {
    const city = urlSearchParams.get('city');
    const checkIn = urlSearchParams.get('checkIn');
    const checkOut = urlSearchParams.get('checkOut');
    
    if (city && checkIn && checkOut) {
      setSearchParams({ city, checkIn, checkOut });
    }
  }, [urlSearchParams]);

  const handleSearch = (searchData) => {
    setSearchParams(searchData);
    
    // Update URL with search params so they persist across navigation
    setUrlSearchParams({
      city: searchData.city,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
    });
  };

  return (
    <div className='min-h-screen bg-white flex flex-col items-center font-[var(--font-family-base)]'>
      {/* HERO SECTION */}
      <section className='w-full max-w-5xl mt-10'>
        <div className='relative w-full rounded-2xl overflow-hidden shadow-lg'>
          <img
            src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
            alt='Beautiful Destination'
            className='w-full h-[450px] object-cover'
          />
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-center px-4'>
            {/* Title */}
            <h2 className='text-white text-4xl md:text-5xl mb-6 drop-shadow-lg font-[var(--font-family)]'>
              Hitta ditt nästa boende
            </h2>
            {/* Search Bar */}
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Hotel List */}
      <section className='w-full max-w-6xl mt-10 px-4'>
        {searchParams && (
          <HotelList
            city={searchParams.city}
            check_in_date={searchParams.checkIn}
            check_out_date={searchParams.checkOut}
          />
        )}
      </section>
    </div>
  );
}