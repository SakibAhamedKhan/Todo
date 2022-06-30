import { signOut } from 'firebase/auth';
import React from 'react';
import { Link } from "react-router-dom";
import auth from '../../firebase.init';
import { NavLink } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return (
        <div class="navbar flex justify-center bg-base-100">
                <ul class="menu menu-horizontal p-0">
                    <li><NavLink to='/dashboard'>DASHBOARD</NavLink></li>
                    <li><NavLink to='/profile'>PROFILE</NavLink></li>
                    <button onClick={() => signOut(auth)} className='btn bg-white border-0 text-black hover:bg-white hover:text-black'>Logout</button>
                </ul>
        </div>
    );
};

export default Navbar;