import { Link } from 'react-router-dom';

export default function HotelCard({ hotel, onReviewClick }) {
  const hotelId = hotel.data_id || encodeURIComponent(hotel.gps_coordinates);

  // Skicka med reviews_list och similar_hotels direkt från hotel-objektet
  const hotelWithDetails = {
    ...hotel,
    reviews_list: hotel.reviews_list || [],
    similar_hotels: hotel.similar_hotels || [],
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full hover:scale-105 transition-transform duration-200">
      {hotel.images?.[0] && (
        <img
          src={hotel.images[0].thumbnail}
          alt={hotel.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold">{hotel.name}</h3>
        <p className="text-gray-600">15–17 September 2025</p>
        {hotel.rate_per_night && (
          <p className="font-semibold mt-2">
            {hotel.rate_per_night.lowest} per natt
          </p>
        )}

        {/* Review Button */}
        {onReviewClick && (
          <button
            className="mt-3 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            onClick={() => onReviewClick(hotelWithDetails)}
          >
            Review
          </button>
        )}

        {/* Link to hotel page */}
        <Link
          to={`/hotel/${hotelId}`}
          state={{ hotel: hotelWithDetails }}
          className="block mt-2 text-blue-500 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
