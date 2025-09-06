import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites';

export default function HotelCard({ hotel, onReviewClick }) {
  const hotelId = hotel.data_id || encodeURIComponent(hotel.gps_coordinates);

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(hotelId));
  }, [hotelId]);

  const handleFavoriteClick = (e) => {
    // This stops the click from navigating to the details page
    e.preventDefault();

    if (isFav) {
      removeFavorite(hotelId);
      setIsFav(false);
    } else {
      addFavorite(hotel);
      setIsFav(true);
    }
  };

  // Skicka med reviews_list och similar_hotels direkt från hotel-objektet
  const hotelWithDetails = {
    ...hotel,
    reviews_list: hotel.reviews_list || [],
    similar_hotels: hotel.similar_hotels || [],
  };

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-200'>
      <Link to={`/hotel/${hotelId}`} state={{ hotel: hotel }} className='block'>
        <div className='relative'>
          <img
            src={hotel.images[0].thumbnail}
            alt={hotel.name}
            // Use a responsive aspect ratio instead of a fixed height
            className='w-full aspect-video object-cover'
          />

          {/* Favorite Knapp */}
          <button
            onClick={handleFavoriteClick}
            className='absolute top-2 right-2 bg-white/80 p-2 rounded-full shadow-lg transition-colors duration-200 hover:bg-red-100'
            aria-label={
              isFav ? 'Ta bort från favoriter' : 'Lägg till som favorit'
            }
          >
            <svg
              className='h-6 w-6'
              fill={isFav ? 'currentColor' : 'none'}
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              // Changes color based on favorite status
              color={isFav ? '#EF4444' : '#6B7280'}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z'
              />
            </svg>
          </button>
        </div>

        <div className='p-4'>
          <h3 className='text-xl font-bold'>{hotel.name}</h3>

          {/* Lägg till rating under namnet */}
          {hotel.overall_rating && (
            <p className='text-yellow-500 font-semibold mt-1'>
              ★ {hotel.overall_rating} ({hotel.reviews || 0} recensioner)
            </p>
          )}

          {hotel.rate_per_night && (
            <p className='font-semibold mt-2'>
              {hotel.rate_per_night.lowest} per natt
            </p>
          )}

          {/* Review Button */}
          {onReviewClick && (
            <button
              className='mt-3 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors'
              onClick={(e) => {
                e.preventDefault();
                onReviewClick(hotelWithDetails);
              }}
            >
              Review
            </button>
          )}

          <p className='block mt-2 text-blue-500 hover:underline'>
            View Details
          </p>
        </div>
      </Link>
    </div>
  );
}