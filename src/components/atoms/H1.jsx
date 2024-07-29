// H1.js
import React from 'react';

const H1 = ({ children, color = 'blue', className = '' }) => {
    const colorClass = color === 'blue' ? 'text-[#004b9c]' : 'text-[#fab001]';

    return (
        <h1 className={`text-[32px] font-bold flex justify-center items-center ${colorClass} ${className}`}>
            {children}
        </h1>
    );
};

export default H1;
