import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import isTokenValid from '../helpers/isTokenValid';

export const AuthContext = createContext({});

function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    async function fetchUserByToken(token) {

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;

            const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'novi-education-project-id': '07470393-2b91-4dbf-92b8-976e6532490b',
                    },
                }
            )

            setIsAuthenticated({
                isAuth: true,
                user: {
                    id: response.data.id,
                    username: localStorage.getItem('username') ?? 'Onbekend',
                    email: response.data.email,
                    roles: response.data.roles,
                },
                status: 'done',
            });
        } catch (error) {
            console.error(error);
            localStorage.removeItem('token');

            setIsAuthenticated({
                isAuth: false,
                user: null,
                status: 'done',
            })
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        console.log('Context wordt gerefresht!');

            if (!token || !isTokenValid(token)) {

                localStorage.removeItem('token');

                setIsAuthenticated({
                    isAuth: false,
                    user: null,
                    status: 'done'
            });
                return;
        }

        fetchUserByToken(token);
    }, []);

    const navigate = useNavigate();

    async function login(userDetails) {
        console.log(userDetails);

        localStorage.setItem('token', userDetails.token);

        setIsAuthenticated({
            isAuth: false,
            user: null,
            status: 'pending',
            });

        await fetchUserByToken(userDetails.token);

        console.log('Gebruiker is ingelogd!');

        navigate('/profile');
    }

    function logout() {

        localStorage.removeItem('token');
        localStorage.removeItem('username');

        setIsAuthenticated({
            isAuth: false,
            user: null,
            status: 'done',
        });

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
            {isAuthenticated.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthProvider;