import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { loginAPICall } from '../service/AuthService';
import { Link, useNavigate } from 'react-router-dom';

const LoginComponent = ({ setRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleLoginForm(e) {
        e.preventDefault();

        loginAPICall(username, password)
            .then((response) => {
                const { token, roles } = response;

                localStorage.setItem('token', token);

                setRole(roles[0]);

                if (roles.includes("ADMIN")) {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/user-dashboard');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'>Login Form</h2>
                        </div>
                        <div className='card-body'>
                            <form>
                                <Input
                                    label="Username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                />
                                <Button label="Submit" onClick={handleLoginForm} />
                            </form>
                        </div>
                        <div className='card-footer text-center'>
                            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
