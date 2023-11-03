import { Link } from 'react-router-dom'
import { ReviewRate } from '../stay-reviews/ReviewRate'
import { DatePickerModal } from './DatePickerModal'
import { useState } from 'react'
import { GuestSelect } from './GuestSelect'
import { utilService } from '../../services/util.service'
import { ButtonReserve } from '../ButtonReserve'
import { useSelector } from 'react-redux'
import { OrderPriceSum } from './OrderPriceSum'

export function OrderModal({
    stay,
    onSetField,
    clearDateRange,
    dateRangeFromOrder
}) {
    const currOrder = useSelector((storeState) => storeState.orderModule.currOrder)
    const [isDatePickerModalOpen, setDatePickerModalOpen] = useState(false)
    const [isGuestSelectModalOpen, setGuestSelectModalOpen] = useState(false)
    const { price, reviews } = stay

    function handleOnClickDatePicker(ev) {
        ev.stopPropagation()
        setDatePickerModalOpen(!isDatePickerModalOpen)
    }

    const guestCount = currOrder.guests
    const totalGuestCount = utilService.countGuests(currOrder.guests)

    const checkIn = dateRangeFromOrder.from ? dateRangeFromOrder.from : 'Add date'
    const checkOut = dateRangeFromOrder.to ? dateRangeFromOrder.to : 'Add date'

    const isOrderToSet = (currOrder.checkIn && currOrder.checkOut) ? true : false

    return (
        <div className="order-modal">
            <header className="order-modal-header">
                <div className="price-per-night">
                    <span className="price">${price} </span>
                    <span className="night">night</span>
                </div>
                <div className="reviews">
                    <ReviewRate reviews={reviews} />
                    <span className="seperator">·</span>
                    <span>{reviews.length} reviews</span>
                </div>
            </header>
            <div className="order-edit-container">
                <div className="date-picker flex" onClick={handleOnClickDatePicker}>
                    <div className="check-in flex column">
                        <span>CHECK-IN</span>
                        <span>{checkIn}</span>
                    </div>
                    <div className="checkout flex column">
                        <span>CHECKOUT</span>
                        <span>{checkOut}</span>
                    </div>
                </div>
                {isDatePickerModalOpen && 
                    <DatePickerModal
                        onSetField={onSetField}
                        clearDateRange={clearDateRange}
                        dateRangeFromOrder={dateRangeFromOrder}
                        isDatePickerModalOpen={isDatePickerModalOpen}
                        setDatePickerModalOpen={setDatePickerModalOpen}
                    />}
                <GuestSelect
                    onSetField={onSetField}
                    guestCount={guestCount}
                    totalGuestCount={totalGuestCount}
                    isGuestSelectModalOpen={isGuestSelectModalOpen}
                    setGuestSelectModalOpen={setGuestSelectModalOpen}
                />
            </div>
            <div onClick={(e) => e.stopPropagation()}>
                <ButtonReserve
                    isOrderToSet={isOrderToSet}
                    setDatePickerModalOpen={setDatePickerModalOpen}
                />
            </div>
            {currOrder.checkIn && currOrder.checkOut &&
                <OrderPriceSum
                    checkIn={checkIn}
                    checkOut={checkOut}
                    price={stay.price}
                    cleaningFee={stay.cleaningFee}
                />}
        </div>
    )
}