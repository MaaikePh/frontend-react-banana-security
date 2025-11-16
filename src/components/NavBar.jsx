import React, {useContext, useEffect} from 'react';
import logo from '../assets/banana-01.png';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';


function NavBar() {
    const navigate = useNavigate();
    const {isAuth, logout} = useContext(AuthContext);

    useEffect(() => {
        console.log('IsAuth status:', isAuth);
    }, [isAuth]);

    return (
        <nav>
            <Link to='/'>
          <span className='logo-container'>
            <img src={logo} alt='logo'/>
            <h3>
              Banana Security
            </h3>
          </span>
            </Link>

            <div>
                {isAuth ? (
                    <button
                        type='button'
                        onClick={logout}>
                        Uitloggen
                    </button>
                ) : (
                    <>
                        <button
                            type='button'
                            onClick={() => navigate('/signin')}
                        >
                            Log in
                        </button>
                        <button
                            type='button'
                            onClick={() => navigate('/signup')}
                        >
                            Registreren
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;