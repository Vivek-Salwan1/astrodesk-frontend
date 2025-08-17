import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './styles/login.css'
import { useUser } from './contexts/UserContext';
import axios from 'axios';
import AdminNavbar from './componants/AdminNavbar';

function Login() {
const { setUserId } = useUser();
 const navigate = useNavigate();
    const [userInput, setUserInput] = useState('');
    const [pass, setPass] = useState('');
    const [ack, setAck] = useState('');



    const handleLogin = (e) => {
        e.preventDefault()


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



    }

    return (
        <div className='login-page'>
            <h1>Losshu Admin</h1>

            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input type="text" name='username' onChange={e => setUserInput(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" name='password' onChange={e => setPass(e.target.value)} />

                <input type="submit" value='Login' />
                <p>{ack && ack}</p>
            </form>

        </div>
    )
}

export default Login;
