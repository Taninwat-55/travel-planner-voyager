import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { addTravelEntry } from '../utils/travelPlanStorage';
import { useAuth } from '../hooks/useAuth'; // Importera den nya hooken

export default function AvailabilityBox({ hotel }) {
  const [showAvailability, setShowAvailability] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const handleBooking = (room) => {
    if (!isAuthenticated) {
      // Om användaren inte är inloggad, skicka dem till inloggningssidan.
      // Vi skickar med nuvarande sida så att de kan komma tillbaka hit efter inloggning.
      navigate('/login', { state: { from: location } });
      return;
    }
    
    // Skapa en post för resplanen
    const newEntry = {
      destination: hotel.name,
      checkIn: new Date().toISOString().slice(0, 10), // Platshållardatum
      checkOut: new Date(Date.now() + 86400000).toISOString().slice(0, 10), // Imorgon
      guests: 2,
      notes: `Bokat: ${room.type}. Pris: ${room.price}.`,
    };

    addTravelEntry(newEntry);

    // Navigera till bekräftelsesidan
    navigate('/booking-confirmation', { state: { hotel, room } });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 sticky top-4 w-full max-w-sm h-auto">
      {hotel.rate_per_night && (
        <div className="flex justify-between items-center mb-3">
          <p className="text-base font-bold">Pris per natt från</p>
          <p className="text-2xl font-extrabold text-slate-800">
            {hotel.rate_per_night.lowest}
          </p>
        </div>
      )}
      <p className="text-xs text-slate-500 mb-3 font-bold">
        Priser kan variera beroende på datum.
      </p>

      <button
        onClick={() => setShowAvailability(!showAvailability)}
        className="w-full bg-[#FF8C00] text-white font-bold text-base py-2.5 rounded-md hover:bg-[#e67600] transition-colors mb-4"
      >
        {showAvailability ? "Dölj tillgänglighet" : "Visa tillgänglighet & Boka"}
      </button>

      {showAvailability && (
        <div className="border-t pt-3 space-y-3">
          {hotel.availability?.length > 0 ? (
            hotel.availability.map((room, idx) => (
              <div key={idx} className="p-3 bg-slate-100 rounded-md">
                <p className="font-extrabold">{room.type}</p>
                <p className="text-sm font-bold">Betyg: {room.rating} ★</p>
                <p className="text-sm font-bold">Pris: {room.price} per natt</p>
                <p className="text-xs text-slate-600 mt-1 font-bold">{room.description}</p>
                <button
                  onClick={() => handleBooking(room)}
                  className="w-full mt-3 bg-green-600 text-white font-bold text-sm py-2 rounded-md hover:bg-green-700 transition"
                >
                  Boka nu
                </button>
              </div>
            ))
          ) : (
            <p className="font-bold">Ingen tillgänglighetsdata hittades</p>
          )}
        </div>
      )}
    </div>
  );
}