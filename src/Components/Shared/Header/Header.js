import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import auth from '../../../Firebase.init';
const Header = () => {
    const [user] = useAuthState(auth);

    const logOut = () => {
        signOut(auth);
        localStorage.removeItem("accessToken")
    };

    const { pathname } = useLocation()

    const menu = <>
        <li><Link to='/'>Home</Link></li>


        {
            user
            &&
            <li><Link to="/dashbord">Dashbord</Link></li>

        }

        <li><Link to='/'>Blogs</Link></li>

        <li>{
            user
                ?
                <Link to="/singin" onClick={logOut}>SignOut</Link>
                :
                <Link to='/singin'>SignIn</Link>
        }</li>

    </>
    return (
        <div className="navbar bg-blue-400 sticky top-0 z-50 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl font-mono "><span className='text-white '>Moto World</span></a>
            </div>
            <div className="lg:navbar-end navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menu}
                </ul>
            </div>
            {pathname.includes("dashbord") && <div className="navbar-end lg:hidden">
                <label tabIndex="1" htmlFor="dashbord-slider" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>}

        </div>
    );
};

export default Header;