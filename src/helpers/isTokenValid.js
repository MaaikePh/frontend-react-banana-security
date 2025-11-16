import {jwtDecode} from 'jwt-decode';

function isTokenValid(token) {
    try {
        const decoded = jwtDecode(token);

        return decoded.exp * 1000 > Date.now();
    } catch (error) {
        return false;
    }
}

export default isTokenValid;