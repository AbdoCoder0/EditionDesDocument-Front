// Text.js
import React from 'react';

const Text = ({ children, className = ''  }) => {
    return (
        <p className={`text-[16px] text-[#212121] font-roboto ${className}`}>
            {children}
        </p>
    );
};

export default Text;
