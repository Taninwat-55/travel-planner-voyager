import { useLocation, Link } from "react-router-dom";
import AvailabilityBox from './AvailabilityBox.jsx'; // importera nya komponenten

const IconText = ({ icon, text, isLink = false, href = "#" }) => {
  const content = (
    <div className="flex items-center gap-2 text-slate-600 transition-colors duration-200 hover:text-sky-600">
      <span className="text-sky-500">{icon}</span>
      <span>{text}</span>
    </div>
  );

  if (isLink) return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  return content;
};

export default function HotelDetailsPage() {
  const location = useLocation();
  const hotel = location.state?.hotel;

  if (!hotel) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Hoppsan!</h1>
        <p className="mt-2">Kunde inte hitta hotelldetaljer.</p>
        <Link to="/" className="text-sky-500 hover:underline mt-4 inline-block">
          Gå tillbaka till startsidan
        </Link>
      </div>
    );
  }

  const { latitude, longitude } = hotel.gps_coordinates || {};
  const googleMapsEmbed = latitude && longitude
    ? `https://www.google.com/maps?q=${latitude},${longitude}&hl=sv&z=15&output=embed`
    : null;

  return (
    <div className="bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <Link to="/" className="text-sky-600 hover:underline text-sm">&larr; Tillbaka till sökresultat</Link>
          <h1 className="text-4xl font-bold text-slate-800 mt-2">{hotel.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            {hotel.overall_rating && (
              <IconText icon="★" text={`${hotel.overall_rating} (${hotel.reviews} recensioner)`} />
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vänster kolumn */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {hotel.images?.[0] && (
                <img src={hotel.images[0].original_image || hotel.images[0].thumbnail} alt={hotel.name} className="w-full h-96 object-cover"/>
              )}
              {hotel.description && (
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">Om hotellet</h2>
                  <p className="text-slate-700 leading-relaxed">{hotel.description}</p>
                </div>
              )}
              {hotel.amenities?.length > 0 && (
                <div className="p-6 border-t">
                  <h2 className="text-2xl font-semibold mb-4">Populära bekvämligheter</h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {hotel.amenities.map((amenity, index) => (
                      <li key={index} className="text-slate-700">✓ {amenity}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Karta */}
              {googleMapsEmbed && (
                <div className="p-6 border-t">
                  <h2 className="text-2xl font-semibold mb-4">Plats</h2>
                  <div className="w-full h-80">
                    <iframe src={googleMapsEmbed} width="100%" height="100%" allowFullScreen="" loading="lazy" className="rounded-lg"></iframe>
                  </div>
                </div>
              )}

              {/* Recensioner */}
              {hotel.reviews_list?.length > 0 && (
                <div className="p-6 border-t">
                  <h2 className="text-2xl font-semibold mb-4">Recensioner</h2>
                  <ul className="space-y-4">
                    {hotel.reviews_list.map((review, idx) => (
                      <li key={idx} className="bg-slate-100 p-4 rounded-lg">
                        <p className="font-semibold">{review.author || "Gäst"}</p>
                        <p className="text-sm text-slate-600">Betyg: {review.rating} ★</p>
                        <p className="mt-2 text-slate-700">{review.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Höger kolumn */}
          <AvailabilityBox hotel={hotel} />
        </div>

        {/* Liknande hotell */}
        {hotel.similar_hotels?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Liknande hotell</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotel.similar_hotels.map((simHotel, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {simHotel.images?.[0] && (
                    <img src={simHotel.images[0].thumbnail} alt={simHotel.name} className="w-full h-40 object-cover"/>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold">{simHotel.name}</h3>
                    <p className="text-sm text-slate-600">{simHotel.rate_per_night?.lowest || "Pris ej tillgängligt"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
