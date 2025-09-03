import { useState, useEffect } from 'react';
import { getTravelPlan, removeTravelEntry } from '../utils/travelPlanStorage';
import { Link } from 'react-router-dom';

export default function TravelPlanPage() {
  const [plan, setPlan] = useState([]);

  // Ladda resplanen från localStorage när sidan visas
  useEffect(() => {
    setPlan(getTravelPlan());
  }, []);

  // Funktion för att ta bort en post och uppdatera sidan
  const handleRemove = (id) => {
    removeTravelEntry(id);
    // Uppdatera state för att omedelbart visa ändringen
    setPlan(getTravelPlan());
  };

  return (
    <div className='p-4 md:p-8'>
      <h1 className='text-4xl font-bold text-slate-800 mb-6'>Min Resplan</h1>

      {plan.length > 0 ? (
        <div className='space-y-4'>
          {plan.map((entry) => (
            <div
              key={entry.id}
              className='bg-white rounded-lg shadow-md p-4 flex justify-between items-start'
            >
              <div>
                <h2 className='text-2xl font-semibold text-sky-700'>
                  {entry.destination}
                </h2>
                <p className='text-slate-600'>
                  <strong>Datum:</strong> {entry.checkIn} till {entry.checkOut}
                </p>
                <p className='text-slate-600'>
                  <strong>Gäster:</strong> {entry.guests}
                </p>
                {entry.notes && (
                  <p className='text-slate-500 mt-2'>
                    <strong>Noteringar:</strong> {entry.notes}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleRemove(entry.id)}
                className='text-red-500 hover:text-red-700 font-semibold'
                aria-label={`Ta bort resan till ${entry.destination}`}
              >
                Ta bort
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <p className='text-xl text-slate-600'>
            Du har inte skapat några resor än.
          </p>
          {/* Här kan du länka till sidan där man kan skapa en resa, om ni har en sådan */}
        </div>
      )}
    </div>
  );
}
