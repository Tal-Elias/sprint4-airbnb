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
import { NavLink } from "react-router-dom";


export function StayOrder() {
    const user = useSelector(storeState => storeState.userModule.user)
    const currOrder = useSelector((storeState) => storeState.orderModule.currOrder)
    const [isGuestSelectModalOpen, setGuestSelectModalOpen] = useState(false)
    const [isDatePickerModalOpen, setDatePickerModalOpen] = useState(false)
    const [stay, setStay] = useState(null)
    const [isGoToTripsShow, setIsGoToTripsShow] = useState(false)
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
        setIsGoToTripsShow(true)
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
                        {isGoToTripsShow &&
                            <div className="go-to-trips flex">
                                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '32px', width: '32px', fill: 'rgb(227, 28, 95)', stroke: 'currentcolor' }}><g><g stroke="none"><path d="M43 8v21.295L32.295 40l-10.359.001A11.971 11.971 0 0 0 26 31c0-6.627-5.373-12-12-12a12.02 12.02 0 0 0-3.001.378L11 8h32z" fillOpacity=".2"></path><path d="M32 42v-8a5 5 0 0 1 4.783-4.995L37 29h8V6H34v2h-2V6H22v2h-2V6H9v14.5H7V6a2 2 0 0 1 1.85-1.995L9 4h11V2h2v2h10V2h2v2h11a2 2 0 0 1 1.995 1.85L47 6v24.953L33.953 44H15v-2h17zm12.123-11H37a3 3 0 0 0-2.995 2.824L34 34v7.122L44.123 31z"></path></g><g fill="none" strokeWidth="2"><path d="M14 43c.328 0 .653-.013.974-.039C21.146 42.465 26 37.299 26 31c0-6.627-5.373-12-12-12A11.995 11.995 0 0 0 2 31c0 6.627 5.373 12 12 12z"></path><path d="M23 31h-9v-9"></path></g></g></svg>
                                <NavLink to="/trip"><h2>Go to trips</h2></NavLink>
                            </div>
                        }
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
