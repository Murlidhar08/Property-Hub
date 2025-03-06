import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Alert } from '@mui/material';
import { UserPlus } from 'lucide-react';

export const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (Object.values(formData).every(val => val)) {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/dashboard');
        } else {
            setError('Please fill in all fields');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <Alert severity="error" className="mb-4">{error}</Alert>}
            <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            <Button
                fullWidth
                variant="contained"
                type="submit"
                startIcon={<UserPlus />}
            >
                Sign up
            </Button>
            <div className="text-sm text-center">
                <Link to="/login" className="text-blue-600 hover:text-blue-500">
                    Already have an account? Sign in
                </Link>
            </div>
        </form>
    );
};