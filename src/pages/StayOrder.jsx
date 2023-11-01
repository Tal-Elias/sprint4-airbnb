import { useEffect, useState } from "react";
import { addOrder } from "../store/actions/order.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { useSelector } from "react-redux";
import { ReviewRate } from "../cmps/stay-reviews/ReviewRate";
import { utilService } from "../services/util.service";
import { stayService } from "../services/stay.service.local";
import { GuestSelectModal } from "../cmps/stay-details/GuestSelectModal";
import { DatePickerModal } from "../cmps/stay-details/DatePickerModal";


export function StayOrder() {
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
    async function onOrder() {
        const orderToSave = {
            hostId: stay.host._id,
            totalPrice: stay.price, //To fix
            checkIn: currOrder.checkIn,
            checkOut: currOrder.checkOut,
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
            const savedOrder = await addOrder(orderToSave)
            showSuccessMsg(`Order added (id: ${savedOrder._id})`)
        } catch (err) {
            showErrorMsg('Cannot add order')
        }
    }

    function formatDateRange(start, end) {

        const startDate = new Date(start);
        const endDate = new Date(end);

        // Convert the months to abbreviated names (e.g., Jan, Feb, Mar)
        const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
        const endMonth = endDate.toLocaleString('en-US', { month: 'short' });

        // Extract the day parts
        const startDay = startDate.getDate();
        const endDay = endDate.getDate();

        // Construct the formatted date range
        if (startMonth === endMonth) return `${startMonth} ${startDay} – ${endDay}`
        else return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
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
                            <button className="btn underline" onClick={onEditDates}>Edit</button>
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
                                <div>{utilService.numOf('guest', ((+currOrder.guests.adults || 1) + +currOrder.guests.children))}</div>
                            </div>
                            <button className="btn underline" onClick={onEditGuests}>Edit</button>
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
                        <div className="price">
                            <div>$779.60 x 5 nights</div>
                            <div>$3,898.00</div>
                        </div>
                        <div className="total">
                            <div >Total ($)</div>
                            <div>$3,898.00</div>
                        </div>
                    </div>
                </div>
            </section>}
            {!currOrder && !stay && <div>loading</div>}
        </div >
    )
}
