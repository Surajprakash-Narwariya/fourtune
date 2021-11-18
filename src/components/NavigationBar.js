import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { logOut, useAuth } from '../funct/firebaseConfig';

function NavigationBar() {
    const currentUser = useAuth();
    const handleLogOut = () => {
        logOut();
    };

    return (
        <div>
            <nav className='navbar navbar-dark bg-dark nav'>
                <h5 style={{ marginLeft: '20px' }}>
                    <Link to='/'>Home</Link>
                </h5>
                <h5>
                    <Link to='/about'>About</Link>
                </h5>
                <h5>
                    <Link to='/contact'>Contact</Link>
                </h5>
                <h5>
                    <Link to='/direction-page'>Donate</Link>
                </h5>
                <h5>
                    <Link to='/dashboard'>Dashboard</Link>
                </h5>
                <h5 style={{ marginRight: '20px' }}>
                    {currentUser ? (
                        <button
                            className='btn btn-secondary'
                            onClick={handleLogOut}
                        >
                            Log Out
                        </button>
                    ) : (
                        <button className='btn btn-secondary'>
                            <Link to='/login'>Login</Link>
                        </button>
                    )}
                </h5>
            </nav>
        </div>
    );
}

export default NavigationBar;
