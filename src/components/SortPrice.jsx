import React from 'react';

export default function SortPrice({ value, onChange }) {
  return (
    <div className="flex justify-end mb-4">
      <label className="flex items-center gap-2">
        Sortera efter pris:
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="lowToHigh">Lägst till högst</option>
          <option value="highToLow">Högst till lägst</option>
        </select>
      </label>
    </div>
  );
}
