import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useEffect, useState } from "react"
import 'react-day-picker/dist/style.css';


export function StayReservation({ stay }) {

    const [selected, setSelected] = useState(null);

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>;
    }
    
    return (
        <div className="reservation-container">
            <div className="order-details">
                <p><span className="price">{`${stay.price} `}</span>night</p>
                <div className="reservation-data">
                    <div className="date-picker flex">
                        <div className="date-input flex">
                            <label htmlFor="">CHECK-IN</label>
                            <DayPicker
                                mode="single"
                                selected={selected}
                                onSelect={setSelected}
                                footer={footer}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}