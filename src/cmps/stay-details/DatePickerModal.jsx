import { useEffect, useRef, useState } from "react";
import { DatePicker } from "../DatePicker";
import { DatePickerPreview } from "./DatePickerPreview";
import useClickOutside from "../../customHooks/useClickOutside";

export function DatePickerModal({
    isDatePickerModalOpen,
    setDatePickerModalOpen,
    onSetField,
    formLayout,
    dateRangeFromOrder
}) {
    const [selectedDateRange, setSelectedDateRange] = useState(null)
    const elDatePickerModal = useRef()

    useEffect(() => {
        if (selectedDateRange?.from) onSetField('checkIn', selectedDateRange.from)
        if (selectedDateRange?.to) onSetField('checkOut', selectedDateRange.to)
    }, [selectedDateRange])

    useClickOutside(elDatePickerModal, () => {
        if (isDatePickerModalOpen) setDatePickerModalOpen(false)
    })

    // function setDateRangeFromOrder() {
    //     const checkIn = new Date(dateRangeFromOrder.checkIn)
    //     const checkOut = new Date(dateRangeFromOrder.checkOut)
    // }

    return (
        <div className={`date-picker-modal ${formLayout ? formLayout : ''}`} ref={elDatePickerModal}>
            <header className="header">
                <div className="side-header">
                    <h2>Select dates</h2>
                    <span>Add your travel dates for exact pricing</span>
                </div>
                <DatePickerPreview
                    selectedDateRange={selectedDateRange}
                />
            </header>
            <DatePicker
                selectedDateRange={selectedDateRange}
                setSelectedDateRange={setSelectedDateRange}
                dateRangeFromOrder={dateRangeFromOrder}
                onSetField={onSetField}
            />
            <div className="reset-close-btns">
                <button onClick={() => setSelectedDateRange(null)}>Clear dates</button>
                <button onClick={() => setDatePickerModalOpen(false)}>Close</button>
            </div>
        </div>
    )
}