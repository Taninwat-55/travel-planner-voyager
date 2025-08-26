import { useLocation, Link } from 'react-router-dom';

// Helper component for icons to make the page cleaner
const IconText = ({ icon, text, isLink = false, href = '#' }) => {
  const content = (
    <div className="flex items-center gap-2 text-slate-600 transition-colors duration-200 hover:text-sky-600">
      <span className="text-sky-500">{icon}</span>
      <span>{text}</span>
    </div>
  );

  if (isLink) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
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

  // Create the Google Maps URL from the gps_coordinates
  const { latitude, longitude } = hotel.gps_coordinates || {};
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div className="bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-4">
          <Link to="/" className="text-sky-600 hover:underline text-sm">
            &larr; Tillbaka till sökresultat
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mt-2">{hotel.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            {hotel.overall_rating && (
              <IconText icon="★" text={`${hotel.overall_rating} (${hotel.reviews} recensioner)`} />
            )}
            {/* Link to Google Maps */}
            {latitude && longitude && (
              <IconText 
                icon="📍" 
                text="Visa på kartan" 
                isLink={true} 
                href={googleMapsUrl} 
              />
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Image and Details) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {hotel.images?.[0] && (
                <img
                  src={hotel.images[0].original_image || hotel.images[0].thumbnail}
                  alt={hotel.name}
                  className="w-full h-96 object-cover"
                />
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
            </div>
          </div>

          {/* Right Column (Booking Box) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              {hotel.rate_per_night && (
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg">Pris per natt från</p>
                  <p className="text-3xl font-extrabold text-slate-800">
                    {hotel.rate_per_night.lowest}
                  </p>
                </div>
              )}
              <p className="text-sm text-slate-500 mb-6">Priser kan variera beroende på datum.</p>
              <button className="w-full bg-sky-500 text-white font-bold text-lg py-3 rounded-md hover:bg-sky-600 transition-colors">
                Visa tillgänglighet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}