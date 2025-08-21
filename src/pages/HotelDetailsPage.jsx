import { useParams } from 'react-router-dom';

export default function HotelDetailsPage() {
  const { id } = useParams();

  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold'>Detaljer för hotell</h1>
      <p className='mt-4 text-lg'>
        Här kommer vi att visa detaljerad information för hotellet med ID: {id}
      </p>
    </div>
  );
}
