export function DatePickerPreview({ selectedDateRange, dateRangeFromOrder }) {

    const fromDate = dateRangeFromOrder ? dateRangeFromOrder.from : selectedDateRange ? selectedDateRange.from.toLocaleDateString() : 'Add date'
    const toDate = dateRangeFromOrder ? dateRangeFromOrder.to : selectedDateRange ? selectedDateRange.to?.toLocaleDateString() : 'Add date'

    return (
        <div className="date-picker-preview flex">
            <div className="check-in flex column">
                <span>CHECK-IN</span>
                <span className={selectedDateRange ? '' : 'add-date'}>{fromDate}</span>
            </div>
            <div className="checkout flex column">
                <span>CHECKOUT</span>
                <span className={selectedDateRange ? '' : 'add-date'}>{toDate}</span>
            </div>
        </div>
    )
}