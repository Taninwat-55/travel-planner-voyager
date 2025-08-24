import { useState, useEffect } from 'react';
import { getFavorites } from '../utils/favorites';
import HotelCard from '../components/HotelCard';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const [favoriteHotels, setFavoriteHotels] = useState([]);

  // När sidan laddas, hämta alla favoriter från localStorage
  useEffect(() => {
    setFavoriteHotels(getFavorites());
  }, []);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-bold text-slate-800 mb-6">Mina favoriter</h1>
      
      {favoriteHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteHotels.map((hotel) => (
            <HotelCard key={hotel.data_id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-slate-600">Du har inte sparat några favoriter än.</p>
          <Link to="/" className="text-sky-600 hover:underline mt-4 inline-block">
            Hitta hotell att spara
          </Link>
        </div>
      )}
    </div>
  );
}