import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './styles/superadminlogin.css'
import { useUser } from './contexts/UserContext';
import axios from 'axios';
import AdminNavbar from './componants/AdminNavbar';
import Loader from './componants/Loader';

function Login() {
const { setUserId } = useUser();
 const navigate = useNavigate();
    const [userInput, setUserInput] = useState('');
    const [pass, setPass] = useState('');
    const [ack, setAck] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true);

        axios.post('https://astrobuddy-2wus.onrender.com/login', {userInput, pass})
        .then(resp => {
            if(resp.data.message == 'success'){
                const userId = resp.data.userId;

                const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
                localStorage.setItem('userSession', JSON.stringify({ userId, expiry }));

                setUserId(userId);
                navigate('/dashboard')
            }else{
                setAck(resp.data.message);
            }
        })
        .catch(err => {
            setAck('Login failed. Please try again.');
            console.error(err);
        })
        .finally(() => {
            setLoading(false);
        });



    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Losshu Admin</h2>
                {ack && <div className="error-message">{ack}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={userInput}
                            onChange={e => setUserInput(e.target.value)}
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
                                onChange={e => setPass(e.target.value)}
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
    )
}

export default Login;
