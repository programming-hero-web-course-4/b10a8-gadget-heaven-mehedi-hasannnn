import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const Root = () => {
    const location = useLocation();

    return (
        <div className='max-w-6xl mx-auto'>
            <NavBar isHomePage={location.pathname === '/'} />
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;
