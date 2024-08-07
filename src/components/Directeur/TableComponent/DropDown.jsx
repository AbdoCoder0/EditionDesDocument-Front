import React from 'react';

function Dropdown ({ filterType, onFilterTypeChange }){
  return (
    <select
      value={filterType}
      onChange={e => onFilterTypeChange(e.target.value)}
      className="mt-2 p-2 border rounded"
    >
      <option value="">Tous les documents</option>
      <option value="Contrat">Contrat</option>
      <option value="Demande de stage">Demande de stage</option>
      <option value="Convention de stage">Convention de stage</option>
      <option value="Attestation d'inscription">Attestation d'inscription</option>
      <option value="Attestation de scolarité">Attestation de scolarité</option>
    </select>
  );
};

export default Dropdown;
