import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites';

export default function HotelCard({ hotel }) {
  const hotelId = hotel.data_id || encodeURIComponent(hotel.gps_coordinates);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(hotelId));
  }, [hotelId]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();

    if(isFav) {
      removeFavorite(hotelId);
      setIsFav(false)
    } else {
      addFavorite(hotel);
      setIsFav(true)
    }
  }

   return (
    <Link
      to={`/hotel/${hotelId}`}
      state={{ hotel: hotel }}
      className="block bg-white rounded-lg shadow-md overflow-hidden h-full group"
    >
      <div className="relative">
        {hotel.images?.[0] && (
          <img
            src={hotel.images[0].thumbnail}
            alt={hotel.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}
        {/* Favoritknappen (hjärtat) */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg transition-colors duration-200 hover:bg-red-100"
          aria-label={isFav ? 'Ta bort från favoriter' : 'Lägg till som favorit'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill={isFav ? 'red' : 'none'}
            viewBox="0 0 24 24"
            stroke={isFav ? 'red' : 'currentColor'}
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold truncate">{hotel.name}</h3>
        <p className="text-gray-600">15–17 September 2025</p>
        {hotel.rate_per_night && (
          <p className="font-semibold mt-2">
            {hotel.rate_per_night.lowest} per natt
          </p>
        )}
      </div>
    </Link>
  );
}
