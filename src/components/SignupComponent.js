import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';

import { useNavigate } from 'react-router-dom';

const SignupComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        city: '',
        role: ''
    });

    const [selectedCity, setSelectedCity] = useState('');
    const handleCitySelect = (city) => {
        setSelectedCity(city);
        formData.city = city;
    };

    const [cities, setCities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/cities')
            .then((response) => {
                setCities(response.data.map(item => item.cityName));
            })
            .catch((error) => {
                console.error('Error fetching cities:', error);
            });
    }, []);

    const navigate = useNavigate();
    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }


    function handleSignupForm(e) {
        e.preventDefault();

        axios.post('http://localhost:8080/api/users/signup', formData)
            .then((response) => {
                console.log("Kayıt Başarılı:", response.data);
                navigate('/login');
            })
            .catch((error) => {
                console.error("Kayıt Hatası:", error);
            });
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'>Signup Form</h2>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSignupForm}>
                                <Input
                                    label="First Name"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter first name"
                                    required
                                />
                                <Input
                                    label="Last Name"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter last name"
                                    required
                                />
                                <Input
                                    label="Username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="Enter username"
                                    required
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter password"
                                    required
                                />

                                <Dropdown
                                    label="City"
                                    options={cities}
                                    selected={selectedCity}
                                    onSelect={handleCitySelect}
                                />

                                <Input
                                    label="Role"
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    placeholder="Enter role"
                                    required
                                />
                                <Button label="Sign Up" type="submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupComponent;
