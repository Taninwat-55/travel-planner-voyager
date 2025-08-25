import { useState } from 'react';
import DateRangePicker from './DateRangePicker';

export default function SearchForm({ onSearch }) {
  const [city, setCity] = useState('');
  const [dates, setDates] = useState({ checkIn: null, checkOut: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city || !dates.checkIn || !dates.checkOut) {
      alert('Vänligen fyll i både stad och datum.');
      return;
    }

    onSearch({
      city,
      checkIn: dates.checkIn.format('YYYY-MM-DD'),
      checkOut: dates.checkOut.format('YYYY-MM-DD'),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-1 p-2 bg-white shadow-md rounded-md"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Sök efter en stad..."
        className="flex-grow p-3 text-lg rounded-md border-2 border-slate-300 focus:border-sky-500 focus:outline-none"
      />

      <DateRangePicker value={dates} onChange={setDates} />

      <button
        type="submit"
        className="ml-2 bg-[#FF8C00] text-white px-7 py-4 rounded-md hover:bg-[#e07b00] transition font-[var(--font-family)]"
      >
        Sök
      </button>
    </form>
  );
}