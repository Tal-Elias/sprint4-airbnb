import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';


export function StayReservation({ stay }) {
    const [startDate, setStartDate] = useState(new Date())
    const [endtDate, setEndDate] = useState(new Date())

    return (
        <div className="reservation-container">
            <div className="order-details">
                <p><span className="price">{`${stay.price} `}</span>night</p>
                <div className="reservation-data">
                    <div className="date-picker flex">
                        <div className="date-input flex">
                            <label htmlFor="start-date">CHECK-IN</label>
                            <DatePicker
                                name="start-date"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                            <label htmlFor="end-date">CHECK-OUT</label>
                            <DatePicker
                                name="end-date"
                                selected={endtDate}
                                onChange={(date) => setEndDate(date)}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}