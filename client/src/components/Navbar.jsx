import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { getCurrentUser, logout } from '../services/auth';

const Navbar = () => {
    const user = getCurrentUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <ul>
                {user && (
                    <>
                        <li><Link to={`/movies`}>Movies</Link></li>
                        <li><Link to={`/directors`}>Directors</Link></li>
                        <li><Link to={`/genres`}>Genres</Link></li>
                        <li><button className={"logout-button"} onClick={handleLogout}>Logout</button></li>
                    </>
                )}
                {!user && (
                    <>
                        <li><Link to={`/login`}>Login</Link></li>
                        <li><Link to={`/register`}>Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;