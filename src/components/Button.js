import React from 'react';

const Button = ({ label, onClick, type = 'button' }) => (
    <div className='form-group mb-3'>
        <button className='btn btn-primary' type={type} onClick={onClick}>
            {label}
        </button>
    </div>
);

export default Button;
