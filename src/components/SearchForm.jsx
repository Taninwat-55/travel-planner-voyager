import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2 p-4'>
      <label htmlFor='city-search' className='sr-only'>
        Sök stad
      </label>

      <input
        id='city-search'
        type='text'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder='Sök efter en stad...'
        className='flex-grow p-3 text-lg rounded-md border-2 border-slate-300 focus:border-sky-500 focus:outline-none'
      />

      <button
        type='submit'
        className='bg-sky-500 text-white font-bold text-lg p-3 rounded-md hover:bg-sky-600 transition-colors'
      >
        Sök
      </button>
    </form>
  );
};

export default SearchForm;
