import { useState } from 'react';
import DatePickerInput from './DatePicker';
import { addTravelEntry } from '../utils/travelPlanStorage';

export default function TravelPlanForm() {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState(null); // success/error msg

  function reset() {
    setDestination('');
    setCheckIn(null);
    setCheckOut(null);
    setGuests(1);
    setNotes('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!destination || !checkIn || !checkOut) {
      setStatus({
        type: 'error',
        text: 'Fyll i destination och båda datumen.',
      });
      return;
    }
    if (checkOut <= checkIn) {
      setStatus({
        type: 'error',
        text: 'Check-out måste vara efter check-in.',
      });
      return;
    }

    const entry = {
      destination,
      checkIn: checkIn.toISOString().slice(0, 10),
      checkOut: checkOut.toISOString().slice(0, 10),
      guests: Number(guests) || 1,
      notes: notes?.trim() || '',
    };

    addTravelEntry(entry);
    setStatus({ type: 'success', text: 'Tillagd till din travel plan.' });
    reset();
  }

  return (
    <section className="w-full mt-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-2xl font-semibold mb-4">Skapa resplan</h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Destination */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Stad eller plats (t.ex. Paris)"
              className="rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Gäster</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Dates */}
          <DatePickerInput
            label="Check-in"
            selectedDate={checkIn}
            onChange={setCheckIn}
            minDate={new Date()}
          />
          <DatePickerInput
            label="Check-out"
            selectedDate={checkOut}
            onChange={setCheckOut}
            minDate={checkIn || new Date()}
          />

          {/* Notes (span full width) */}
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Anteckningar (valfritt)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Något annat att komma ihåg…"
              rows={3}
              className="rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-sky-600 px-5 py-2.5 text-white font-semibold hover:bg-sky-700 transition"
            >
              Lägg till i reseplan
            </button>
          </div>
        </form>

        {status && (
          <p
            className={`mt-3 text-sm ${
              status.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status.text}
          </p>
        )}
      </div>
    </section>
  );
}
