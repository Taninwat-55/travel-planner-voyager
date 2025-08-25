// AvailabilityBox.jsx
import { useState } from 'react';

export default function AvailabilityBox({ hotel }) {
  const [showAvailability, setShowAvailability] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
      {hotel.rate_per_night && (
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg">Pris per natt från</p>
          <p className="text-3xl font-extrabold text-slate-800">
            {hotel.rate_per_night.lowest}
          </p>
        </div>
      )}
      <p className="text-sm text-slate-500 mb-4">
        Priser kan variera beroende på datum.
      </p>

      <button
        onClick={() => setShowAvailability(!showAvailability)}
        className="w-full bg-sky-500 text-white font-bold text-lg py-3 rounded-md hover:bg-sky-600 transition-colors mb-4"
      >
        {showAvailability ? "Dölj tillgänglighet" : "Visa tillgänglighet"}
      </button>

      {showAvailability && (
        <div className="border-t pt-4 space-y-2">
          {hotel.availability?.length > 0 ? (
            hotel.availability.map((room, idx) => (
              <div key={idx} className="p-2 bg-slate-100 rounded">
                <p className="font-semibold">{room.type}</p>
                <p>Betyg: {room.rating} ★</p>
                <p>Pris: {room.price} per natt</p>
                <p>{room.description}</p>
              </div>
            ))
          ) : (
            <p>Ingen tillgänglighetsdata hittades</p>
          )}
        </div>
      )}
    </div>
  );
}
