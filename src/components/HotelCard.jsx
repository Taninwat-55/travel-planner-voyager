import React from "react";

export default function HotelCard({ hotel }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
      </div>
    </div>
  );
}
