import React from 'react';

export const AuthContext = React.createContext({});

const data = {
    chocolade: 5,
    mango: 1,
}

function AuthProvider({ children }) {
    return (
        <>
            <AuthContext.Provider value={{data}}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthProvider;