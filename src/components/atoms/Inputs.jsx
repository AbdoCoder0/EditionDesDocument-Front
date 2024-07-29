import React from 'react';


const Inputs = ({ type = 'text', value, onChange, placeholder, name, id }) => {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        id={id}
        className="border border-[#E0E0E0] bg-white text-[#424242] text-base font-regular rounded-md py-2 px-4"
      />
    );
  };


export default Inputs;