import { Link } from 'react-router-dom'
import { ReviewRate } from '../stay-reviews/ReviewRate'
import { DatePickerModal } from './DatePickerModal'
import { useEffect, useState } from 'react'
import { GuestSelect } from './GuestSelect'

export function OrderModal({ stay, orderToEdit, onSetField }) {
    const [isDatePickerModalOpen, setDatePickerModalOpen] = useState(false)
    const [isGuestSelectModalOpen, setGuestSelectModalOpen] = useState(false)
    const { price, reviews } = stay

    useEffect(() => {
        // console.log('dateRangeParams:', dateRangeParams)
        // console.log('guestsParams:', guestsParams)
    }, [])

    function handleOnClickDatePicker(ev) {
        ev.stopPropagation()
        setDatePickerModalOpen(!isDatePickerModalOpen)
    }

    const guestsCount = orderToEdit.guests
    const { checkIn, checkOut } = orderToEdit
    const dateRangeFromOrder = { from: new Date(checkIn), to: new Date(checkOut) }

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
                        <span>Add date</span>
                    </div>
                    <div className="checkout flex column">
                        <span>CHECKOUT</span>
                        <span>Add date</span>
                    </div>
                </div>
                <GuestSelect
                    isGuestSelectModalOpen={isGuestSelectModalOpen}
                    setGuestSelectModalOpen={setGuestSelectModalOpen}
                    guestsCount={guestsCount}
                    onSetField={onSetField}
                />
            </div>
            <Link to={`/stay/order`}>
                <button className="reserve btn scale">Reserve</button>
            </Link>
            {isDatePickerModalOpen && (
                <DatePickerModal
                    isDatePickerModalOpen={isDatePickerModalOpen}
                    setDatePickerModalOpen={setDatePickerModalOpen}
                    dateRangeFromOrder={dateRangeFromOrder}
                    onSetField={onSetField}
                />
            )}
        </div>
    )
}