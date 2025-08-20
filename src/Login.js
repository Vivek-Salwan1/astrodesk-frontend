import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './styles/login.css'
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
        <div className='login-page'>
            <h1>Losshu Admin</h1>

            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input type="text" name='username' onChange={e => setUserInput(e.target.value)} />

                <label htmlFor="password">Password</label>
                <div className='password-input'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        onChange={e => setPass(e.target.value)}
                    />
                    <button
                        type="button"
                        className='toggle-password'
                        onClick={() => setShowPassword(prev => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>

                <button type="submit" disabled={loading} className="login-submit-btn">
                    {loading ? <Loader size={20} /> : 'Login'}
                </button>
                <p>{ack && ack}</p>
            </form>

        </div>
    )
}

export default Login;
