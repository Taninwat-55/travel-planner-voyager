// AvailabilityBox.jsx
import { useState } from 'react';

export default function AvailabilityBox({ hotel }) {
  const [showAvailability, setShowAvailability] = useState(false);

  return (
  <div className="bg-white rounded-xl shadow-md p-5 sticky top-4 w-full max-w-sm h-50">
    {hotel.rate_per_night && (
      <div className="flex justify-between items-center mb-3">
        <p className="text-base">Pris per natt från</p>
        <p className="text-2xl font-extrabold text-slate-800">
          {hotel.rate_per_night.lowest}
        </p>
      </div>
    )}

    <p className="text-xs text-slate-500 mb-3">
      Priser kan variera beroende på datum.
    </p>

    <button
      onClick={() => setShowAvailability(!showAvailability)}
      className="w-full bg-[#FF8C00] text-white font-bold text-base py-2.5 rounded-md hover:bg-[#e67600] transition-colors mb-4"
    >
      {showAvailability ? "Dölj tillgänglighet" : "Visa tillgänglighet"}
    </button>

    {showAvailability && (
      <div className="border-t pt-3 space-y-2">
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
