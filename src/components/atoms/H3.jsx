// H3.js
import React from 'react';

const H3 = ({ children, className = '' , color = 'dark' }) => {
    let colorClass;
    switch (color) {
        case 'dark':
            colorClass = 'text-[#424242]';
            break;
        case 'light':
            colorClass = 'text-[#E0E0E0]';
            break;
        case 'medium':
            colorClass = 'text-[#9E9E9E]';
            break;
        default:
            colorClass = 'text-[#9E9E9E]';
    }

    return (
        <h3 className={`text-[20px] font-medium ${colorClass}${className}`}>
            {children}
        </h3>
    );
};

export default H3;
