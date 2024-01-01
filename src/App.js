import React, { useEffect, useState } from 'react';
import AdminRoutes from './routes/AdminRoutes';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAuth, AuthProvider } from '../src/Auth/AuthContext';
import StaffRoutes from './routes/StaffRoutes';

function App(props) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AdminRoutes />
    </LocalizationProvider>
  );
}

export default App;