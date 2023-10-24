import { useState } from "react";
import { DatePicker } from "../DatePicker";
import { DatePickerPreview } from "./DatePickerPreview";

export function DatePickerModal({ setDatePickerModalOpen }) {
    const [selectedDateRange, setSelectedDateRange] = useState(null)

    return (
        <div className="date-picker-modal">
            <header className="header">
                <div className="side-header">
                    <h2>Select dates</h2>
                    <span>Add your travel dates for exact pricing</span>
                </div>
                <DatePickerPreview selectedDateRange={selectedDateRange} />
            </header>
            <DatePicker setSelectedDateRange={setSelectedDateRange} />
            <div className="reset-close-btns">
                <button onClick={() => setSelectedDateRange(null)}>Clear dates</button>
                <button onClick={() => setDatePickerModalOpen(false)}>Close</button>
            </div>
        </div>
    )
}