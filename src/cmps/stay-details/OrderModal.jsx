import { Link } from 'react-router-dom'
import { ReviewRate } from '../stay-reviews/ReviewRate'
import { DatePickerModal } from './DatePickerModal'
import { useEffect, useState } from 'react'
import { GuestSelect } from './GuestSelect'
import { utilService } from '../../services/util.service'
import { ButtonReserve } from '../ButtonReserve'

export function OrderModal({ stay, orderToEdit, onSetField }) {
    const [isDatePickerModalOpen, setDatePickerModalOpen] = useState(false)
    const [isGuestSelectModalOpen, setGuestSelectModalOpen] = useState(false)
    const { price, reviews } = stay

    function handleOnClickDatePicker(ev) {
        ev.stopPropagation()
        setDatePickerModalOpen(!isDatePickerModalOpen)
    }

    const guestsCount = orderToEdit.guests
    const totalGuestCount = utilService.countGuests(orderToEdit.guests)
    const { checkIn, checkOut } = orderToEdit
    const dateRangeFromOrder = {
        from: utilService.timeStampToLongDate(checkIn),
        to: utilService.timeStampToLongDate(checkOut)
    }

    const fromDate = dateRangeFromOrder.from ? dateRangeFromOrder.from : 'Add date'
    const toDate = dateRangeFromOrder.to ? dateRangeFromOrder.to : 'Add date'

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
                        <span>{fromDate}</span>
                    </div>
                    <div className="checkout flex column">
                        <span>CHECKOUT</span>
                        <span>{toDate}</span>
                    </div>
                </div>
                <GuestSelect
                    isGuestSelectModalOpen={isGuestSelectModalOpen}
                    setGuestSelectModalOpen={setGuestSelectModalOpen}
                    guestsCount={guestsCount}
                    totalGuestCount={totalGuestCount}
                    onSetField={onSetField}
                />
            </div>
            <Link to={`/stay/order`}>
                <ButtonReserve children={'Reserve'} />
                {/* <button className="reserve btn scale">Reserve</button> */}
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