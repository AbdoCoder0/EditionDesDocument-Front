// Legends.js
import React from 'react';

const Legends = ({ children, className = ''  }) => {
    return (
        <p className={`text-[14px] text-[#757575] font-light font-roboto ${className}`}>
            {children}
        </p>
    );
};

export default Legends;
