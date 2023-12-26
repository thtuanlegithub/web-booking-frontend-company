import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
function Layout(props) {
    return (
        <div className='flex h-screen !overflow-hidden'>
            <Sidebar />
            <div className='flex-1  overflow-y-scroll'>
                <Header />
                <div className='p-4 h-max'><Outlet /></div>
            </div>
        </div>
    );
}

export default Layout;