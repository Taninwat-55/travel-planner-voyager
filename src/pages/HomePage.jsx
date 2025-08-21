import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import HotelList from '../components/HotelList'; // Importera HotelList

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (searchedCity) => {
    setSearchQuery(searchedCity);
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />

      <HotelList query={searchQuery} />
    </>
  );
}
