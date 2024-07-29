// H2.js
import React from 'react';

const H2 = ({ children, color = 'blue', className = '' }) => {
    const colorClass = color === 'blue' ? 'text-[#2196F3]' : 'text-[#FF9800]';

    return (
        <h2 className={`text-[24px] font-roboto font-medium ${colorClass}  ${className}`}>
            {children}
        </h2>
    );
};

export default H2;
