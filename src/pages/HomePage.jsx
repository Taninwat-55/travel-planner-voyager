import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import HotelList from '../components/HotelList'; // Importera HotelList

export default function HomePage() {
  const [inputValue, setInputValue] = useState(''); // for typing
  const [searchQuery, setSearchQuery] = useState(''); // for actual search

  const handleSearch = () => {
    setSearchQuery(inputValue); // update search results only on submit
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-[var(--font-family-base)]">
      {/* HERO SECTION */}
      <section className="w-full max-w-5xl mt-10">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Beautiful Destination"
            className="w-full h-[450px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-center px-4">
            {/* Title */}
            <h2 className="text-white text-4xl md:text-5xl mb-6 drop-shadow-lg font-[var(--font-family)]">
              Find your next stay
            </h2>

            {/* Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="flex items-center bg-[#f5f5f5] w-80 md:w-[450px] rounded-full shadow-md px-4 py-3 border border-gray-200"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search"
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg font-[var(--font-family)]"
              />
              <button
                type="submit"
                className="ml-2 bg-[#FF8C00] text-white px-5 py-2 rounded-full hover:bg-[#e07b00] transition font-[var(--font-family)]"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* HOTEL LIST */}
        <HotelList query={searchQuery} />
      </section>
    </div>
  );
}
