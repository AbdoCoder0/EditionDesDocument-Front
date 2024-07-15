import React from 'react';

function Dropdown ({ filterType, onFilterTypeChange }){
  return (
    <select
      value={filterType}
      onChange={e => onFilterTypeChange(e.target.value)}
      className="mt-2 p-2 border rounded"
    >
      <option value="">Type de document</option>
      <option value="Contrat">Contrat</option>
      <option value="demande de stage">Demande de stage</option>
      <option value="convention de stage">Convention de stage</option>
      <option value="Attestation d'inscription">Attestation d'inscription</option>
      <option value="attestation de scolarité">Attestation de scolarité</option>
    </select>
  );
};

export default Dropdown;
