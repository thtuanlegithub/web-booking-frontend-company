import React from 'react';
import AdminRoutes from './routes/AdminRoutes';
import { ThemeProvider } from "@material-tailwind/react";

function App(props) {
  return (
    <ThemeProvider>
      <AdminRoutes />
    </ThemeProvider>
  );
}

export default App;