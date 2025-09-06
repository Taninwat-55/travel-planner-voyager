// Simple, dependency-free date input wrapper
const DatePickerInput = ({ label, selectedDate, onChange, minDate }) => {
  // Expect selectedDate as a Date or null. Convert to yyyy-mm-dd for input.
  const toYmd = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : '');
  const fromYmd = (v) => (v ? new Date(v + 'T00:00:00') : null);

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        type="date"
        value={toYmd(selectedDate)}
        min={minDate ? toYmd(minDate) : undefined}
        onChange={(e) => onChange(fromYmd(e.target.value))}
        className="w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-slate-400"
        placeholder={label}
      />
    </div>
  );
};

export default DatePickerInput;