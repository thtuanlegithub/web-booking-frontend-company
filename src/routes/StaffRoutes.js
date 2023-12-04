import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Travel from '../components/Travel';
import Booking from '../components/Booking';
import Customer from '../components/Customer';
import Invoice from '../components/Invoice';
import Login from '../components/Login';
import Support from '../components/Support';
import Layout from '../components/shared/Layout';
function AdminRoutes(props) {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Dashboard />}></Route>
                        <Route path='travel' element={<Travel />}></Route>
                        <Route path='booking' element={<Booking />}></Route>
                        <Route path='customer' element={<Customer />}></Route>
                        <Route path='support' element={<Support />}></Route>
                        <Route path='invoice' element={<Invoice />}></Route>
                    </Route>
                    <Route path='/login' element={<Login />}>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default AdminRoutes;