// user context
import React, { createContext, useState } from 'react';

const UserContext = createContext();

function getUserFromLocalStorage() {
    return localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : { username: null, token: null };
}

function UserProvider({ children }) {
    // const [user, setUser] = useState({ username: null, token: null });
    const [user, setUser] = useState(getUserFromLocalStorage());

    const userLogin = user => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const useLogout = () => {
        setUser({ username: null, token: null });
        localStorage.removeItem('user');
    }
    return (
        <UserContext.Provider value={{ user, userLogin, useLogout }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext };
