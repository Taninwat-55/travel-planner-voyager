import { useState } from 'react';
import HotelFetch from './components/HotelList';
import SearchForm from './components/SearchForm';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (searchedCity) => {
    console.log('App.jsx sätter ny sökning till:', searchedCity);
    setSearchQuery(searchedCity);
  };

  return (
    <>
      <div className='bg-slate-100 min-h-screen'>
        <header className='p-8 bg-white shadow-md'>
          <h1 className='text-4xl font-bold text-slate-800'>Travel Planner</h1>
        </header>
        <main>
          <SearchForm onSearch={handleSearch} />

          <HotelFetch query={searchQuery} />
        </main>
      </div>
    </>
  );
}

export default App;
