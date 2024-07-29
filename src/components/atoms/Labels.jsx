import React from 'react';

const Labels = ({ children, htmlFor , className = ''  }) => {
    return (
      <label 
        htmlFor={htmlFor} 
        className={`text-[#424242] text-sm font-medium py-4 ${className}`}>
        {children}
      </label>
    );
  };
export default Labels;