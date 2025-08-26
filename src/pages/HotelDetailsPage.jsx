import { useLocation, Link } from "react-router-dom";
import AvailabilityBox from '../components/AvailabilityBox'; 

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
    ? `https://maps.google.com/maps?q=${latitude},${longitude}&hl=sv&z=15&output=embed`
    : null;

   return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#FF8C00] hover:text-[#e07b00] text-sm font-medium transition-colors group"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span>
          Tillbaka till sökresultat
        </Link>
        <div className="mt-4 space-y-3">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
            {hotel.name}
          </h1>
          
          {hotel.overall_rating && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-amber-100 px-3 py-1.5 rounded-full">
                <span className="text-amber-500 text-lg">★</span>
                <span className="font-semibold text-amber-700">{hotel.overall_rating}</span>
              </div>
              <span className="text-slate-600 font-medium">
                {hotel.reviews} recensioner
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left column */}
        <div className="xl:col-span-3 space-y-8">
          {/* Hero Image */}
          {hotel.images?.[0] && (
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
              <img
                src={hotel.images[0].original_image || hotel.images[0].thumbnail}
                alt={hotel.name}
                className="w-full h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}

          {/* Enhanced About Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
              Om hotellet
            </h2>
            
            {/* Description */}
            {hotel.description && (
              <div className="mb-8">
                <p className="text-slate-700 leading-relaxed text-lg font-light mb-6">
                  {hotel.description}
                </p>
              </div>
            )}

            {/* Hotel Story & Highlights */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-blue-100">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">✨</span>
                Vad gör detta hotell speciellt
              </h3>
              
              <div className="space-y-4 text-slate-700">
                {/* Known for section */}
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">🏆</span>
                  <div>
                    <span className="font-medium text-slate-800">Känt för:</span>
                    <p className="mt-1">
                      {hotel.known_for || 
                       hotel.property_highlights?.[0] || 
                       "Exceptionell service och bekväma rum som ger gästerna en minnesvärd vistelse."}
                    </p>
                  </div>
                </div>

                {/* Location benefits */}
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">📍</span>
                  <div>
                    <span className="font-medium text-slate-800">Läge:</span>
                    <p className="mt-1">
                      {hotel.location_description || 
                       (hotel.address?.toLowerCase().includes('centrum') || hotel.address?.toLowerCase().includes('center') 
                        ? "Strategiskt beläget i centrala delar av staden med enkel tillgång till lokala attraktioner och transport."
                        : "Bekvämt beläget med god tillgång till stadens sevärdheter och faciliteter.")}
                    </p>
                  </div>
                </div>

                {/* Nearby attractions */}
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">🎯</span>
                  <div>
                    <span className="font-medium text-slate-800">I närheten:</span>
                    <p className="mt-1">
                      {hotel.nearby_description || 
                       hotel.nearby_attractions?.join(', ') ||
                       "Gästerna kan enkelt utforska lokala restauranger, shopping, kulturella attraktioner och andra sevärdheter i området."}
                    </p>
                  </div>
                </div>

                {/* Guest experience */}
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 mt-1">⭐</span>
                  <div>
                    <span className="font-medium text-slate-800">Gästupplevelse:</span>
                    <p className="mt-1">
                      {hotel.guest_experience || 
                       (hotel.overall_rating >= 4 
                        ? "Högt värderat av gäster för sin kvalitet, service och bekvämligheter som skapar en förstklassig upplevelse."
                        : "Erbjuder en bekväm och trevlig vistelse med fokus på gästernas välbefinnande och komfort.")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Grundläggande information</h3>
                
                {hotel.type && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                    <span className="text-slate-600">Typ:</span>
                    <span className="font-medium text-slate-800">{hotel.type}</span>
                  </div>
                )}

                {hotel.hotel_class && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
                    <span className="text-slate-600">Hotellklass:</span>
                    <span className="font-medium text-slate-800">
                      {hotel.hotel_class} {Array.from({length: parseInt(hotel.hotel_class) || 0}, () => '★').join('')}
                    </span>
                  </div>
                )}

                {hotel.overall_rating && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
                    <span className="text-slate-600">Betyg:</span>
                    <span className="font-medium text-slate-800">{hotel.overall_rating}/5 ★</span>
                  </div>
                )}

                {hotel.reviews && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                    <span className="text-slate-600">Recensioner:</span>
                    <span className="font-medium text-slate-800">{hotel.reviews} recensioner</span>
                  </div>
                )}
              </div>

              {/* Location & Contact */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Plats & kontakt</h3>
                
                {hotel.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full mt-2"></div>
                    <div>
                      <span className="text-slate-600">Adress:</span>
                      <p className="font-medium text-slate-800">{hotel.address}</p>
                    </div>
                  </div>
                )}

                {hotel.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
                    <span className="text-slate-600">Telefon:</span>
                    <a href={`tel:${hotel.phone}`} className="font-medium text-blue-600 hover:underline">
                      {hotel.phone}
                    </a>
                  </div>
                )}

                {hotel.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full"></div>
                    <span className="text-slate-600">E-post:</span>
                    <a href={`mailto:${hotel.email}`} className="font-medium text-blue-600 hover:underline">
                      {hotel.email}
                    </a>
                  </div>
                )}

                {hotel.website && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full"></div>
                    <span className="text-slate-600">Webbsida:</span>
                    <a 
                      href={hotel.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Besök webbsida →
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            {(hotel.check_in_time || hotel.check_out_time || hotel.cancellation_policy) && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Viktiga detaljer</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {hotel.check_in_time && (
                    <div className="bg-white/50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-500">🕐</span>
                        <span className="font-semibold text-slate-700">Incheckning</span>
                      </div>
                      <p className="text-slate-600">{hotel.check_in_time}</p>
                    </div>
                  )}

                  {hotel.check_out_time && (
                    <div className="bg-white/50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500">🕐</span>
                        <span className="font-semibold text-slate-700">Utcheckning</span>
                      </div>
                      <p className="text-slate-600">{hotel.check_out_time}</p>
                    </div>
                  )}

                  {hotel.cancellation_policy && (
                    <div className="bg-white/50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-500">📋</span>
                        <span className="font-semibold text-slate-700">Avbokning</span>
                      </div>
                      <p className="text-slate-600 text-sm">{hotel.cancellation_policy}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Amenities */}
          {hotel.amenities?.length > 0 && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></span>
                Populära bekvämligheter
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/50 p-4 rounded-xl hover:bg-white/80 transition-colors group">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full group-hover:scale-125 transition-transform"></div>
                    <span className="text-slate-700 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Map */}
          {googleMapsEmbed && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-rose-500 to-pink-600 rounded-full"></span>
                Plats
              </h2>
              <div className="w-full h-96 rounded-xl overflow-hidden shadow-inner">
                <iframe
                  src={googleMapsEmbed}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>
          )}

          {/* Reviews */}
          {hotel.reviews_list?.length > 0 && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full"></span>
                Recensioner
              </h2>
              <div className="space-y-6">
                {hotel.reviews_list.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/30 hover:bg-white/80 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-slate-800">{review.author || "Gäst"}</h4>
                      <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full">
                        <span className="text-amber-500 font-bold">{review.rating}</span>
                        <span className="text-amber-500">★</span>
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-light">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column - Sticky */}
        <div className="xl:col-span-1">
          <div className="sticky top-6">
            <AvailabilityBox hotel={hotel} />
          </div>
        </div>
      </div>

      {/* Similar hotels */}
      {hotel.similar_hotels?.length > 0 && (
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-8 text-center">
            Liknande hotell
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {hotel.similar_hotels.map((simHotel, idx) => (
              <div
                key={idx}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {simHotel.images?.[0] && (
                  <div className="relative overflow-hidden">
                    <img
                      src={simHotel.images[0].thumbnail}
                      alt={simHotel.name}
                      className="w-full h-48 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {simHotel.name}
                  </h3>
                  <p className="text-slate-600 font-medium">
                    {simHotel.rate_per_night?.lowest || "Pris ej tillgängligt"}
                  </p>
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
