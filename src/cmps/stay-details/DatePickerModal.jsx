import { useEffect, useRef, useState } from "react";
import { DatePicker } from "../DatePicker";
import { DatePickerPreview } from "./DatePickerPreview";
import useClickOutside from "../../customHooks/useClickOutside";
import { utilService } from "../../services/util.service";
import { useSelector } from "react-redux";

export function DatePickerModal({
    isDatePickerModalOpen,
    setDatePickerModalOpen,
    onSetField,
    formLayout,
    detailsLayout,
    clearDateRange,
    dateRangeFromOrder
}) {
    const currOrder = useSelector((storeState) => storeState.orderModule.currOrder)
    const [selectedDateRange, setSelectedDateRange] = useState(null)
    const elDatePickerModal = useRef()

    useEffect(() => {
        if (dateRangeFromOrder) {
            const dateRangeToConvert = {
                from: dateRangeFromOrder.from,
                to: dateRangeFromOrder.to
            }
            const updatedDateRange = utilService.convertDates(dateRangeToConvert)
            setSelectedDateRange(updatedDateRange)
        }
    }, [])

    useEffect(() => {
        if (!currOrder.checkIn && !currOrder.checkOut) {
            setSelectedDateRange(null)
        }
    }, [currOrder])

    // useEffect(() => {
    //     console.log('selectedDateRange:', selectedDateRange)
    //     if (selectedDateRange?.from) onSetField('checkIn', selectedDateRange.from)
    //     if (selectedDateRange?.to) onSetField('checkOut', selectedDateRange.to)
    // }, [selectedDateRange])

    useClickOutside(elDatePickerModal, () => {
        if (isDatePickerModalOpen) setDatePickerModalOpen(false)
    })

    const currLayout = formLayout ? 'form-layout' : detailsLayout ? 'details-layout' : ''

    return (
        <div
            className={`date-picker-modal ${currLayout}`}
            ref={elDatePickerModal}
            onClick={(e) => e.stopPropagation()}
        >
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
                onSetField={onSetField}
                selectedDateRange={selectedDateRange}
                setSelectedDateRange={setSelectedDateRange}
            />
            <div className="reset-close-btns">
                <button className="btn btn-clear grey-bg scale underline" onClick={() => { setSelectedDateRange(null); clearDateRange() }}>Clear dates</button>
                <button className="btn btn-close scale" onClick={() => setDatePickerModalOpen(false)}>Close</button>
            </div>
        </div>
    )
}