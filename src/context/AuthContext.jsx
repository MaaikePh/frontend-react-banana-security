import {createContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext({});

function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    function login() {
        setIsAuthenticated(true);
        console.log('Gebruiker is ingelogd!');
        navigate('/profile');
    }

    function logout() {
        setIsAuthenticated(false);
        console.log('Gebruiker is uitgelogd!');
        navigate('/');
    }

    const data = {
        isAuth: isAuthenticated,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;