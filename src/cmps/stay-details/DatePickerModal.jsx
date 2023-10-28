import { useRef, useState } from "react";
import { DatePicker } from "../DatePicker";
import { DatePickerPreview } from "./DatePickerPreview";
import useClickOutside from "../../customHooks/useClickOutside";

export function DatePickerModal({ isDatePickerModalOpen, setDatePickerModalOpen, formLayout }) {
    const [selectedDateRange, setSelectedDateRange] = useState(null)
    const elDatePickerModal = useRef()

    useClickOutside(elDatePickerModal, () => {
        if (isDatePickerModalOpen) setDatePickerModalOpen(false)
    })

    return (
        <div className={`date-picker-modal ${formLayout ? formLayout : ''}`} ref={elDatePickerModal}>
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