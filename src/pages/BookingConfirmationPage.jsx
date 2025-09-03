import { useLocation, Link } from 'react-router-dom';

export default function BookingConfirmationPage() {
  const location = useLocation();
  const { hotel, room } = location.state || {}; // Hämta data som skickades med

  if (!hotel || !room) {
    return (
      <div className='text-center p-8'>
        <h1 className='text-2xl font-bold'>Något gick fel</h1>
        <p className='mt-2'>Kunde inte hitta bokningsdetaljer.</p>
        <Link to='/' className='text-sky-500 hover:underline mt-4 inline-block'>
          Tillbaka till startsidan
        </Link>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 text-center'>
        <h1 className='text-3xl font-bold text-green-600 mb-4'>
          Bokning bekräftad!
        </h1>
        <p className='text-gray-600 mb-6'>
          Tack för din bokning. En bekräftelse har (simulerat) skickats till din
          e-post. Din resa har lagts till i "Min Resplan".
        </p>
        <div className='text-left bg-gray-50 p-6 rounded-md border'>
          <h2 className='text-xl font-semibold mb-4'>Bokningsdetaljer</h2>
          <p>
            <strong>Hotell:</strong> {hotel.name}
          </p>
          <p>
            <strong>Rumstyp:</strong> {room.type}
          </p>
          <p>
            <strong>Pris:</strong> {room.price} per natt
          </p>
        </div>
        <Link
          to='/travel-plan'
          className='mt-6 inline-block bg-[#FF8C00] text-white font-bold py-2 px-6 rounded-md hover:bg-[#e07b00] transition'
        >
          Visa min resplan
        </Link>
      </div>
    </div>
  );
}
