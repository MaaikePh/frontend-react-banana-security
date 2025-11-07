import React, {useContext, useState} from 'react';
import logo from '../assets/banana-01.png';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';


function NavBar() {
  const navigate = useNavigate();
  const data  = useContext(AuthContext);

  return (
    <nav>
        <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
            {console.log(data)}
          </span>
        </Link>

      <div>
        <button
          type="button"
          onClick={() => navigate('/signin')}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
        >
          Registreren
        </button>
      </div>
    </nav>
  );
}

export default NavBar;