import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { baseURL } from '../../services';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const history = useNavigate();

    // Redirect to the homepage if the user is already logged in
    

    // Google Login save the JWT tokens in localStorage
    const googleLogin = async () => {
        try {
            const response = await axios.get(baseURL + 'google/login/', {
                params: {
                    redirect_uri: baseURL + 'google/callback/'
                }
            });
            window.location.href = response.data.authorization_url;
        } catch (error) {
            console.log(error);
        }
    }

    // Handle the callback from Google
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const access_token = urlParams.get('tokens.access');
        if (access_token) {
            localStorage.setItem('access', access_token);
            history('/'); // redirect to home
        }
    }, [history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await axios.post(baseURL + 'login/', {
                email: email,
                password: password
            });

            // Store the JWT tokens in localStorage
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);

            // Show success message
            toast.success('Login successful! You are now logged in.');

            // Redirect to the homepage or any protected route and reload the page
            history('/', { replace: true });
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data) {
                const { detail, email, password } = error.response.data;

                if (detail) {
                    toast.error(detail);
                }

                setErrors({ email, password });
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    <h2 className="my-4">Login</h2>
                    <form noValidate onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    {/* Google Login */}
                    <div className="my-3">
                        <button onClick={googleLogin} className="btn btn-primary w-100">Login with Google</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
