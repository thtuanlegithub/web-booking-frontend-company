import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
function Layout(props) {
    return (
        <div>
            <div className='flex h-full'>
                <Sidebar />
                <div className='flex-1'>
                    <Header />
                    <div className='p-4 h-screen'><Outlet /></div>
                </div>
            </div>
        </div>
    );
}

export default Layout;