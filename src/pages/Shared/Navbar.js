import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div class="navbar flex justify-center bg-base-100">
                <ul class="menu menu-horizontal p-0">
                    <li><Link to='/dashboard'>DASHBOARD</Link></li>
                    <li><Link to='/profile'>PROFILE</Link></li>
                    <button className='btn bg-white border-0 text-black hover:bg-white hover:text-black'>Logout</button>
                </ul>
        </div>
    );
};

export default Navbar;