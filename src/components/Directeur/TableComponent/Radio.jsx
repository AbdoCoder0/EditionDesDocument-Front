import React from 'react';

const Radio = ({ filterStatus, onFilterStatusChange }) => {
  return (
    <div className="mt-2">
      <label className="mr-2">
        <input
          type="radio"
          value=""
          checked={filterStatus === ""}
          onChange={() => onFilterStatusChange("")}
        />
        Tous
      </label>
      <label className="mr-2">
        <input
          type="radio"
          value="1"
          checked={filterStatus === "1"}
          onChange={() => onFilterStatusChange("1")}
        />
        Validé
      </label>
      <label className="mr-2">
        <input
          type="radio"
          value="0"
          checked={filterStatus === "0"}
          onChange={() => onFilterStatusChange("0")}
        />
        En cours
      </label>
      <label>
        <input
          type="radio"
          value="2"
          checked={filterStatus === "2"}
          onChange={() => onFilterStatusChange("2")}
        />
        Refusé
      </label>
    </div>
  );
};

export default Radio;
