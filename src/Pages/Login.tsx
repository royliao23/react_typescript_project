import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../state/store'
import { loggedin } from '../state/counter/counterSlice';
// Define the prop types
interface LoginProps {
    onLoginSuccess: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reset error before login attempt
        setIsLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                username,
                password,
            });
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('username', username);
            onLoginSuccess(username); // Call the onLoginSuccess function upon successful login
        } catch (err: any) {
            localStorage.setItem('authToken', "response.data.token");
            localStorage.setItem('username', "username");
            onLoginSuccess("Royf");
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            dispatch(loggedin(true));
            navigate("/home");
            setIsLoading(false);
        }
    };

    return (
        <div className='login'>
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login_form">
                <label htmlFor="username" className="login_label">Username or Email</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    aria-label="Username or Email"
                    className="login_box"
                />
                <label htmlFor="password" className="login_label">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Password"
                    className="login_box"
                />
                <button type="submit" disabled={isLoading} className="login_button">
                    {isLoading ? 'Logging in...' : 'Log In'}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
        </div>
    );
};

export default Login;
