import React from 'react';
import '../components/styles/Login.css';
import { Input, InputField, Button } from "@material-tailwind/react";
import { FaLock, FaUser } from 'react-icons/fa';
function Login(props) {
    return (
        <div className='login-container 2xl:w-1/3 lg:w-1/2 login-background m-auto mt-24 p-12 rounded-2xl shadow-lg'>
            <div className='heading-color font-bold text-2xl text-center'>Welcome to Tour Management!</div>
            <div className='heading-color font-regular text-lg text-center'>Please log in to use the service!</div>
            <div className="mt-4 w-72 m-auto">
                <label className='text-blue-800 font-medium text-sm' htmlFor='email'>Email</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 mt-1">
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blue-900 absolute bg-transparent rounded-lg text-base items-center justify-center w-8 pl-3 py-3">
                        <FaUser className='input-color mt-1' />
                    </span>
                    <input autoComplete='off' id='email' type="text" placeholder="Enter your email" className="px-3 py-3 placeholder-blue-400 text-blue-900 relative bg-white bg-white rounded-lg text-sm border border-blue-500 outline-none focus:outline-none focus:ring w-full pl-10" />
                </div>
            </div>
            <div className='mt-4 w-72 m-auto'>
                <label className='text-blue-800 font-medium text-sm' htmlFor='password'>Password</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 mt-1">
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blue-800 absolute bg-transparent rounded-lg text-base items-center justify-center w-8 pl-3 py-3">
                        <FaLock className='input-color mt-1' />
                    </span>
                    <input id='password' type="password" placeholder="Enter your password" className="px-3 py-3 placeholder-blue-400 text-blue-800 relative bg-white bg-white rounded-lg text-sm border border-blue-500 outline-none focus:outline-none focus:ring w-full pl-10" />
                </div>
            </div>
            <div className='mt-4 w-72 m-auto'>
                <Button className='w-72 h-12 login-button mt-4'>Log in</Button>
            </div>
        </div>
    );
}

export default Login;