import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
function Layout(props) {
    return (
        <div>
            <div className='flex flex-row h-screen'>
                <Sidebar />
                <div className='flex-1'>
                    <Header />
                    <div className='p-4'><Outlet /></div>
                </div>
            </div>
        </div>
    );
}

export default Layout;