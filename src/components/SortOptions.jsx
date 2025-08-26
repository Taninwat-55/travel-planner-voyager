// SortOptions.jsx
import React from 'react';

export default function SortOptions({ value, onChange }) {
  return (
    <div className="flex justify-end mb-4">
      <label className="flex items-center gap-2">
        Sortera hotell:
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="relevance">Relevans</option>
          <option value="lowToHigh">Pris: Lågt till högt</option>
          <option value="highToLow">Pris: Högt till lågt</option>
          <option value="rating">Betyg: Högt till lågt</option>
        </select>
      </label>
    </div>
  );
}
