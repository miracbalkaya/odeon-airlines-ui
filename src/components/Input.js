import React from 'react';

const Input = ({ label, type, name, value, onChange, placeholder, required }) => {
    return (
        <div className='form-group'>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                className='form-control'
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default Input;
