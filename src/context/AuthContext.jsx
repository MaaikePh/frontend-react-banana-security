import {createContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext({});

function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState({
        isAuth: false,
        user: null,
    });
    const navigate = useNavigate();

    function login(userDetails) {
        console.log(userDetails);
        localStorage.setItem('token', userDetails.token);
        setIsAuthenticated({
            isAuth: true,
            user: {
                email: userDetails.email,
                roles: userDetails.roles,
            }
            });
        console.log('Gebruiker is ingelogd!');
        navigate('/profile');
    }

    function logout() {
        setIsAuthenticated(false);
        console.log('Gebruiker is uitgelogd!');
        navigate('/');
    }

    const data = {
        isAuth: isAuthenticated.isAuth,
        user: isAuthenticated.user,
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