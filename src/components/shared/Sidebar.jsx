import React from 'react';
import classNames from 'classnames';
import { MdOutlineModeOfTravel } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { DASHBOARD_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/navigation';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Color.css';
import '../styles/Sidebar.css';
const linkClasses = 'flex items-center gap-2 font-regular mx-2 px-3 py-3 text-lg hover:no-underline hover:rounded-2xl sidebar-menu-btn'
function Sidebar(props) {
    return (
        <div className='flex flex-col sidebar-menu w-72 p-3 text-white'>
            <div className='flex items-center place-content-center gap-2 px-1'>
                <span className='text-white text-2xl pt-2 font-bold'>Tour Management</span>
            </div>
            <div className='flex-1 py-8 flex flex-col gap-1'>
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>
            <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
                {DASHBOARD_BOTTOM_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
                <div className={classNames('text-red-500 cursor-pointer mb-16', linkClasses)}>
                    <span className='text-xl mr-3 ml-2'>
                        <HiOutlineLogout />
                    </span>
                    Log out
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

const SidebarLink = ({ item }) => {
    const { pathname } = useLocation();
    return (
        <Link to={item.path} className={classNames(pathname == item.path ? 'text-white rounded-2xl sidebar-menu-btn hover:no-underline sidebar-menu-active' : 'text-white', linkClasses)}>
            <span className='text-lg mr-3 ml-2'>{item.icon}</span>
            {item.label}
        </Link>
    )
}