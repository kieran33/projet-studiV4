import React, { createContext, useState } from 'react';

export const RegimeContext = createContext();

export const RegimeProvider = ({ children }) => {
    const [regime, setRegime] = useState('');

    return (
        <RegimeContext.Provider value={{ regime, setRegime }}>
            {children}
        </RegimeContext.Provider>
    );
};