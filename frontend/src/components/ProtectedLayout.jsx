import { Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Navbar } from './Navbar';

export const ProtectedLayout = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Navbar />
            <Box sx={{ p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    );
};