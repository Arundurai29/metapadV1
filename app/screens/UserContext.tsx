import React, { createContext, useContext, useState, useEffect } from 'react';
import { FIREBASE_AUTH, DATABASE } from '../../FireBaseConfig';
import { ref, onValue } from 'firebase/database';

// Create User Context
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = FIREBASE_AUTH.currentUser;
        if (currentUser) {
            const userRef = ref(DATABASE, 'users/' + currentUser.uid);
            onValue(userRef, (snapshot) => {
                setUser(snapshot.val());
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
