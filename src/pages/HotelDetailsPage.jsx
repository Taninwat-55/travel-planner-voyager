import { useLocation, useParams, Link } from 'react-router-dom';

export default function HotelDetailsPage() {
  const { id } = useParams();
  const location = useLocation();

  const hotel = location.state?.hotel;

  if (!hotel) {
    return (
      <div className='p-8 text-center'>
        <h1 className='text-2xl font-bold text-red-600'>Hoppsan!</h1>
        <p className='mt-2'>Kunde inte hitta hotelldetaljer.</p>
        <Link to='/' className='text-sky-500 hover:underline mt-4 inline-block'>
          Gå tillbaka till startsidan
        </Link>
      </div>
    );
  }

  return (
    <div className='p-4 md:p-8'>
      <div className='bg-white rounded-lg shadow-xl max-w-4xl mx-auto overflow-hidden'>
        {hotel.images?.[0] && (
          <img
            src={hotel.images[0].thumbnail}
            alt={hotel.name}
            className='w-full h-64 object-cover'
          />
        )}
        <div className='p-6'>
          <h1 className='text-4xl font-bold text-slate-800'>{hotel.name}</h1>

          {hotel.rate_per_night && (
            <p className='text-2xl font-light text-slate-600 mt-2'>
              {hotel.rate_per_night.lowest} per natt
            </p>
          )}

          <div className='mt-4 border-t pt-4'>
            <h2 className='text-2xl font-semibold mb-2'>Bekvämligheter</h2>
            <ul className='list-disc list-inside grid grid-cols-2 gap-x-4'>
              {hotel.amenities?.map((amenity, index) => (
                <li key={index} className='text-slate-700'>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          <div className='mt-6 text-center'>
            <Link to='/' className='text-sky-600 hover:underline'>
              &larr; Tillbaka till sökresultat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
