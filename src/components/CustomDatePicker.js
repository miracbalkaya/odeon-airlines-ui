import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ selected, onChange }) => {
    return (
        <div className='form-group'>
            <label>Tarih ve Saat Seçiniz</label>
            <DatePicker
                selected={selected}
                onChange={onChange}
                className='form-control'
                dateFormat='dd/MM/yyyy h:mm aa'
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={1}
                timeCaption='Saat'
            />
        </div>
    );
};

export default CustomDatePicker;
