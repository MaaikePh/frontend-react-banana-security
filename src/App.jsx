import React from 'react';
import {Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <>
            <NavBar/>
            <div className='content'>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
                    <Route path='/signin' element={<SignIn/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
