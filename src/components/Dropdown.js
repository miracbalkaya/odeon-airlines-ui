import React, { useState } from 'react';


const Dropdown = ({label, options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
        onSelect(option);
        setSearchTerm('');
        toggleDropdown();
    };

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <label>{label}</label>
            <div onClick={toggleDropdown} style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px' }}>
                {selected || 'Select City'} {}
            </div>
            {isOpen && (
                <div style={{ border: '1px solid #ccc', position: 'absolute', zIndex: 1, backgroundColor: 'white' }}>
                    <input
                        type="text"
                        placeholder="Ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                    />
                    <ul style={{ maxHeight: '150px', overflowY: 'auto', padding: '0', margin: '0', listStyle: 'none', backgroundColor: 'white' }}>
                        {filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(option)}
                                style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'white' }}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


export default Dropdown;
