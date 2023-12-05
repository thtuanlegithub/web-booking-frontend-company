import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../components/pages/Dashboard';
import Travel from '../components/pages/Travel';
import Tour from '../components/pages/Tour';
import Package from '../components/pages/Package';
import Promotion from '../components/pages/Promotion'
import Booking from '../components/pages/Booking';
import Customer from '../components/pages/Customer';
import Invoice from '../components/pages/Invoice';
import Login from '../components/pages/Login';
import Support from '../components/pages/Support';
import Layout from '../components/shared/Layout';
function AdminRoutes(props) {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Dashboard />}></Route>
                        <Route path='package' element={<Package />}></Route>
                        <Route path='tour' element={<Tour />}></Route>
                        <Route path='travel' element={<Travel />}></Route>
                        <Route path='promotion' element={<Promotion />}></Route>
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