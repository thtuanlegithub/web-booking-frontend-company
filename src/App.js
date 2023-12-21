import React from 'react';
import AdminRoutes from './routes/AdminRoutes';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function App(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AdminRoutes />
    </LocalizationProvider>
  );
}

export default App;