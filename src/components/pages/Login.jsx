import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { Input, InputField, Button } from "@material-tailwind/react";
import { FaLock, FaUser } from 'react-icons/fa';
import { companyLogin } from '../../services/loginService';
import { useAuth } from '../../Auth/AuthContext.js';
function Login(props) {
    const { login, user } = useAuth();
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        let userData = {
            username: username,
            password: password
        }
        let res = await companyLogin(userData);
        if (res && res.data && res.data.EC === '0') {
            console.log(res.data);
            if (res.data.EM === 'Login successfully') {
                let token = res.data.DT;
                login(token);
                localStorage.setItem('token', token);
                navigate('/');
                console.log("Login successfully");
            }
        }
    }
    useEffect(() => {
        console.log('user', user); // Giá trị user đã được cập nhật
        if (user) {
            navigate('/');
        }
    }, [user]);
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    return (
        <div className='login-container container 2xl:w-1/3 lg:w-1/2 login-background m-auto mt-24 p-12 rounded-2xl shadow-lg'>
            <div className='heading-color font-bold text-2xl text-center'>Welcome to Tour Management!</div>
            <div className='heading-color font-regular text-lg text-center'>Please log in to use the service!</div>
            <div className="mt-4 w-72 m-auto">
                <label className='text-blue-800 font-medium text-sm' htmlFor='email'>Username</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 mt-1">
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blue-800 absolute bg-transparent rounded-lg text-base items-center justify-center w-8 pl-3 py-3">
                        <FaUser className='input-color m-0.5' />
                    </span>
                    <input
                        onChange={handleUsernameChange}
                        value={username}
                        autoComplete='off'
                        id='email' type="text"
                        placeholder="Enter your username"
                        className="px-3 py-3 placeholder-blue-200 text-blue-800 relative bg-white bg-white rounded-lg text-sm border border-blue-500 outline-none focus:outline-none focus:ring-2 w-full pl-10 font-medium" />
                </div>
            </div>
            <div className='mt-2 w-72 m-auto'>
                <label className='text-blue-800 font-medium text-sm' htmlFor='password'>Password</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 mt-1">
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blue-800 absolute bg-transparent rounded-lg text-base items-center justify-center w-8 pl-3 py-3">
                        <FaLock className='input-color mt-0.5' />
                    </span>
                    <input
                        onChange={handlePasswordChange}
                        value={password}
                        id='password' type="password" placeholder="Enter your password" className="px-3 py-3 placeholder-blue-200 text-blue-800 relative bg-white rounded-lg text-sm border border-blue-500 outline-none focus:outline-none focus:ring-2 w-full pl-10 font-medium" />
                </div>
            </div>
            <div className='mt-4 mb-4 w-72 m-auto'>
                <Button className='w-72 h-12 login-button mt-4' onClick={handleLogin}>Log in</Button>
            </div>
        </div>
    );
}

export default Login;