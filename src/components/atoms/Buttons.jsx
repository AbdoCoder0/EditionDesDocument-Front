import React from 'react';

const Buttons = ({ type = 'primary', children, onClick, disabled = false }) => {
  const baseStyle = 'rounded-md text-base font-medium py-2 px-4 transition duration-300';

  const styles = {
    primary: `bg-[#1A237E] text-white hover:bg-[#0D153A] ${baseStyle}`,
    secondary: `bg-white text-[#1A237E] border border-[#1A237E] hover:bg-[#E8EAF6] ${baseStyle}`,
    disabled: `bg-[#E0E0E0] text-[#9E9E9E] cursor-not-allowed ${baseStyle}`
  };

  return (
    <button 
      className={`${disabled ? styles['disabled'] : styles[type]}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Buttons;
