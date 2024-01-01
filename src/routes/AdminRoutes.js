// AdminRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import Dashboard from '../components/pages/Dashboard';
import Travel from '../components/pages/Travel/Travel';
import CreateTravel from '../components/pages/Travel/CreateTravel';
import UpdateTravel from '../components/pages/Travel/UpdateTravel';
import Tour from '../components/pages/Tour/Tour';
import CreateTour from '../components/pages/Tour/CreateTour';
import Package from '../components/pages/Package/Package';
import Discount from '../components/pages/Discount/Discount';
import Booking from '../components/pages/Booking/Booking';
import CreateBooking from '../components/pages/Booking/CreateBooking';
import Customer from '../components/pages/Customer/Customer';
import Login from '../components/pages/Login';
import Support from '../components/pages/Support';
import Layout from '../components/shared/Layout';
import UpdateTour from '../components/pages/Tour/UpdateTour';
import UpdateBooking from '../components/pages/Booking/UpdateBooking';
import CreateDiscount from '../components/pages/Discount/CreateDiscount';
import UpdateDiscount from '../components/pages/Discount/UpdateDiscount';
import { useNavigate } from 'react-router-dom';
function AdminRoutes(props) {
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
                    <Route path='package' element={<Package />} />
                    <Route path='tour' element={<Tour />} />
                    <Route path='create-tour' element={<CreateTour />} />
                    <Route path='update-tour/:tourId' element={<UpdateTour />} />
                    <Route path='travel' element={<Travel />} />
                    <Route path='create-travel' element={<CreateTravel />} />
                    <Route path='update-travel/:travelId' element={<UpdateTravel />} />
                    <Route path='discount' element={<Discount />} />
                    <Route path='create-discount' element={<CreateDiscount />} />
                    <Route path='update-discount' element={<UpdateDiscount />} />
                    <Route path='booking' element={<Booking />} />
                    <Route path='create-booking' element={<CreateBooking />} />
                    <Route path='update-booking/:bookingId' element={<UpdateBooking />} />
                    <Route path='customer' element={<Customer />} />
                    <Route path='support' element={<Support />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AdminRoutes;
