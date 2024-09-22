import React from 'react';

const Checkbox = ({ label, name, checked, onChange }) => {
    return (
        <div className='form-check'>
            <input
                type='checkbox'
                name={name}
                className='form-check-input'
                checked={checked}
                onChange={onChange}
            />
            <label className='form-check-label'>{label}</label>
        </div>
    );
};

export default Checkbox;
