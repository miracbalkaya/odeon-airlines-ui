import React from 'react';

const Select = ({ label, name, options, value, onChange }) => {
    return (
        <div className='form-group'>
            <label>{label}</label>
            <select name={name} className='form-control' value={value} onChange={onChange}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
