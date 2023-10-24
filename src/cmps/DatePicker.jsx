import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export function DatePicker({ setSelectedDateRange }) {
  const [range, setRange] = useState()

  const today = new Date()
  const disabledDays = [
    { before: today }
  ]

  function handleDateSelect(selectedRange) {
    setRange(selectedRange)
    setSelectedDateRange(selectedRange)
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
    />
  )
}
