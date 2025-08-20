import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import '../styles/superadminlogin.css';
import Loader from './Loader';

const SuperAdminLogin = () => {
    const [userInput, setUserInput] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setUserId } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('https://astrobuddy-2wus.onrender.com/super-admin-login', {
                userInput,
                pass
            });

            if (response.data.message === 'success') {

                const expiry = Date.now() + 24 * 60 * 60 * 1000;
                localStorage.setItem('userSession', JSON.stringify({ userId: response.data.userId, expiry }));
                setUserId(response.data.userId);
                navigate('/super-admin-dashboard');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Super Admin Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group password-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(prev => !prev)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? <Loader size={20} /> : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SuperAdminLogin; 