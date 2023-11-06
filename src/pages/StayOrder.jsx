import { useEffect, useState } from "react";
import { addOrder } from "../store/actions/order.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { useSelector } from "react-redux";
import { ReviewRate } from "../cmps/stay-reviews/ReviewRate";
import { utilService } from "../services/util.service";
import { stayService } from "../services/stay.service";
import { GuestSelectModal } from "../cmps/stay-details/GuestSelectModal";
import { DatePickerModal } from "../cmps/stay-details/DatePickerModal";
import { Logo } from "../cmps/Logo";
import { OrderPriceSum } from "../cmps/stay-details/OrderPriceSum";


export function StayOrder() {
    const user = useSelector(storeState => storeState.userModule.user)
    const currOrder = useSelector((storeState) => storeState.orderModule.currOrder)
    const [isGuestSelectModalOpen, setGuestSelectModalOpen] = useState(false)
    const [isDatePickerModalOpen, setDatePickerModalOpen] = useState(false)
    const [stay, setStay] = useState(null)
    const { stay: { _id: stayId } } = currOrder

    useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log('Had issues in stay details', err)
            showErrorMsg('Cannot load stay')
            navigate('/')
        }
    }

    function getTotalPrice() {
        const SERVICE_FEE = 11.2
        const totalNights = utilService.getTotalNights(currOrder.checkIn, currOrder.checkOut)
        const totalNightPrice = stay.price * totalNights
        const serviceFee = Math.round(SERVICE_FEE * totalNights)
        const totalPrice = totalNightPrice + serviceFee + stay.cleaningFee
        return totalPrice
    }



    async function onOrder() {
        if (!user) return showErrorMsg('Please login')
        const orderToSave = {
            hostId: stay.host._id,
            totalPrice: getTotalPrice(),
            checkIn: currOrder.checkIn,
            checkOut: currOrder.checkOut,
            guestCount: currOrder.guestCount,
            guests: {
                adults: currOrder.adults,
                kids: currOrder.children
            },
            stay: {
                _id: stay._id,
                name: stay.name,
                price: stay.price,

            },
            msgs: [],
            status: 'pending'
        }
        try {
            await addOrder(orderToSave)
            showSuccessMsg(`Order added successfully`)
        } catch (err) {
            showErrorMsg('Cannot add order')
        }
    }

    function onEditGuests(ev) {
        ev.stopPropagation()
        setGuestSelectModalOpen(!isGuestSelectModalOpen)
    }

    function onEditDates(ev) {
        ev.stopPropagation()
        setDatePickerModalOpen(!isDatePickerModalOpen)
    }

    const currOrderCheckIn = utilService.timeStampToLongDate(currOrder.checkIn)
    const currOrderCheckOut = utilService.timeStampToLongDate(currOrder.checkOut)

    return (
        <div>
            <header className="stay-order-header">
                <Logo />
            </header>
            {!currOrder || !stay && <div>loading</div>}
            {currOrder && stay && <section className="stay-order">
                <div className="confirm" >
                    {/* should be changed to a better way to navigate
                    which saves the order details */}
                    <div className="back-arrow" onClick={() => window.history.back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-label="Back" role="img" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 3, overflow: 'visible' }}><path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path></svg>
                    </div>
                    <h1>Confirm and pay</h1>
                </div>
                <div className="summary">
                    <div className="trip-summary">
                        <h2>Your trip</h2>
                        <div className="order-edit">
                            <div className="details">
                                <h3>Dates</h3>
                                <div>{`${currOrderCheckIn} - ${currOrderCheckOut}`}</div>
                            </div>
                            <button disabled className="btn underline" onClick={onEditDates}>Edit</button>
                            {isDatePickerModalOpen &&
                                <DatePickerModal
                                    isDatePickerModalOpen={isDatePickerModalOpen}
                                    setDatePickerModalOpen={setDatePickerModalOpen}
                                />
                            }
                        </div>
                        <div className="order-edit">
                            <div className="details">
                                <h3>Guests</h3>
                                <div>{utilService.checkIfPlural('guest', ((+currOrder.guests.adults || 1) + +currOrder.guests.children))}</div>
                            </div>
                            <button disabled className="btn underline" onClick={onEditGuests}>Edit</button>
                            {isGuestSelectModalOpen &&
                                <GuestSelectModal />
                            }
                        </div>
                        <button className="confirm-btn btn scale" onClick={onOrder}>Confirm and pay</button>
                    </div>
                    <div className="stay-modal">
                        <div className="stay-details">
                            <div>

                                <img src={stay.imgUrls[0]} />
                            </div>
                            <div className="stay-details-txt">
                                <div className="stay-summary">
                                    <h5 className="stay-type">{stay.type}</h5>
                                    <h5 className="stay-name">{stay.name}</h5>
                                </div>
                                <div className="flex reviews">
                                    <ReviewRate reviews={stay.reviews} />
                                    <div className="reviews-count">{'(' + stay.reviews.length + ')'}</div>
                                </div>
                            </div>
                        </div>
                        <h2>Price details</h2>
                        <OrderPriceSum checkIn={currOrder.checkIn} checkOut={currOrder.checkOut} price={stay.price} cleaningFee={stay.cleaningFee} />
                    </div>
                </div>
            </section>}
        </div >
    )
}
