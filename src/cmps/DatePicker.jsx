import React, { useState } from 'react';
import { useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export function DatePicker({
    selectedDateRange,
    setSelectedDateRange,
    onSetField,
    detailsLayout
}) {
    const [range, setRange] = useState()

    useEffect(() => {
        if (!selectedDateRange) setRange(null)
        else setRange(selectedDateRange)
    }, [selectedDateRange])

    const today = new Date()
    const disabledDays = [
        { before: today }
    ]

    const modifiers = {
        today: { daysOfWeek: [today.getDay()], before: today }
    }

    function handleDateSelect(selectedRange) {
        setRange(selectedRange)
        setSelectedDateRange(selectedRange)
        if (selectedRange?.from) onSetField('checkIn', selectedRange.from.getTime())
        if (selectedRange?.to) onSetField('checkOut', selectedRange.to.getTime())
    }

    return (
        <DayPicker
            className="day-picker"
            id="test"
            mode="range"
            numberOfMonths={2}
            selected={range}
            onSelect={handleDateSelect}
            disabled={disabledDays}
            modifiers={modifiers}
        />
    )
}
