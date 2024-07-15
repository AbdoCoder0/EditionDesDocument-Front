import React from 'react';

const DateFilter = ({ filterDate, onFilterDateChange }) => {
  return (
    <input
      type="date"
      value={filterDate}
      onChange={e => onFilterDateChange(e.target.value)}
      className="mt-2 p-2 border rounded"
    />
  );
};

export default DateFilter;
