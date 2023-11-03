export function DatePickerPreview({ selectedDateRange, dateRangeFromOrder }) {

    const checkIn = selectedDateRange?.from ? selectedDateRange.from.toLocaleDateString() : 'Add date'
    const checkOut = selectedDateRange?.to ? selectedDateRange.to.toLocaleDateString() : 'Add date'

    return (
        <div className="date-picker-preview flex">
            <div className="check-in flex column">
                <span>CHECK-IN</span>
                <span className={selectedDateRange ? '' : 'add-date'}>{checkIn}</span>
            </div>
            <div className="checkout flex column">
                <span>CHECKOUT</span>
                <span className={selectedDateRange ? '' : 'add-date'}>{checkOut}</span>
            </div>
        </div>
    )
}