import { useState, useEffect, useRef } from "react";
import DateRangePicker from "./DateRangePicker";

export default function SearchForm({ onSearch }) {
  const [city, setCity] = useState("");
  const [dates, setDates] = useState({ checkIn: null, checkOut: null });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [openGuests, setOpenGuests] = useState(false);
  const dropdownRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city || !dates.checkIn || !dates.checkOut) {
      alert("Vänligen fyll i både stad och datum.");
      return;
    }

    onSearch({
      city,
      checkIn: dates.checkIn.format("YYYY-MM-DD"),
      checkOut: dates.checkOut.format("YYYY-MM-DD"),
      adults,
      children,
    });
  };

  // Stäng dropdown om man klickar utanför
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenGuests(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-2 p-2 bg-white shadow-md rounded-md relative"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Sök efter en stad..."
        className="flex-grow p-3 text-lg rounded-md border-2 border-slate-300 focus:border-sky-500 focus:outline-none"
      />

      <DateRangePicker value={dates} onChange={setDates} />

      {/* Guest dropdown med Who och gubbe */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenGuests(!openGuests)}
          className="px-4 h-12 border border-slate-300 rounded flex items-center gap-2 bg-white"
        >
          Who👤 
        </button>

        {openGuests && (
          <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-300 rounded shadow-md p-4 z-10">
            <div className="flex justify-between items-center mb-2">
              <span>Vuxna</span>
              <input
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-16 p-1 border border-slate-300 rounded"
              />
            </div>
            <div className="flex justify-between items-center">
              <span>Barn</span>
              <input
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-16 p-1 border border-slate-300 rounded"
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="ml-2 bg-[#FF8C00] text-white px-7 py-4 rounded-md hover:bg-[#e07b00] transition font-[var(--font-family)]"
      >
        Sök
      </button>
    </form>
  );
}
