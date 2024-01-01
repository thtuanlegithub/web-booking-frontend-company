import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/pages/Dashboard';
import Travel from '../components/pages/Travel/Travel';
import Booking from '../components/pages/Booking/Booking';
import Customer from '../components/pages/Customer/Customer';
import Login from '../components/pages/Login';
import Support from '../components/pages/Support';
import Layout from '../components/shared/Layout';
import { useAuth } from '../Auth/AuthContext';
function StaffRoutes(props) {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />

                <Route
                    path='/'
                    element={user ?
                        <Layout /> : <Navigate to='/login' replace />
                    }>
                    <Route index element={<Dashboard />} />
                    <Route path='booking' element={<Booking />} />
                    <Route path='customer' element={<Customer />} />
                    <Route path='support' element={<Support />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default StaffRoutes;