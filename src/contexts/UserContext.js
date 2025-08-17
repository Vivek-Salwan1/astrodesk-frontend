import { createContext, useContext, useEffect, useState } from 'react';

// Create context
export const UserContext = createContext();

// Create a provider
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState('');

    //  Restore userId from localStorage on first load
    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('userSession'));
        if (session && session.expiry > Date.now()) {
            setUserId(session.userId);
        } else {
            localStorage.removeItem('userSession');
        }
    }, []);


    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for easier access
export const useUser = () => useContext(UserContext);
