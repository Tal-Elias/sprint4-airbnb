import { useEffect } from "react";
import { addOrder, setCurrOrder } from "../store/actions/order.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { useSelector } from "react-redux";
import { orderService } from "../services/order.service.local";
import { setCurrStay } from "../store/actions/stay.actions";

export function StayOrder() {
    const order = useSelector((storeState) => storeState.orderModule.currOrder)
    const stay = useSelector((storeState) => storeState.stayModule.currStay)

    useEffect(() => {
        console.log('stay:', stay)
        console.log('order:', order)

        return () => {
            setCurrOrder(orderService.getEmptyOrder())
            setCurrStay(null)
        }
    }, [])

    async function onOrder() {
        try {
            const savedOrder = await addOrder(order)
            showSuccessMsg(`Order added (id: ${savedOrder._id})`)
        } catch (err) {
            showErrorMsg('Cannot add order')
        }
    }
    console.log('order in stayOrder:', order)

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
        if (startMonth===endMonth) return `${startMonth} ${startDay} – ${endDay}`
        else return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
    }

    return (
        <div>
            {order && stay && <section className="stay-order">

                <div className="confirm">
                    <h1>Confirm and pay</h1>
                </div>
                <div className="summary">
                    <div className="trip-summary">
                        <h2>Your trip</h2>
                        <div className="order-edit">
                            <div className="details">
                                <h3>Dates</h3>
                                <div>{formatDateRange(order.startDate, order.endDate)}</div>

                            </div>
                            <button className="btn-underline">Edit</button>
                        </div>
                        <div className="order-edit">
                            <div className="details">
                                <h3>Guests</h3>
                                <div>{order.guests.adults + order.guests.kids}</div>
                            </div>
                            <button className="btn-underline">Edit</button>
                        </div>
                        <button className="confirm-btn" onClick={onOrder}>Confirm and pay</button>
                    </div>
                    <div className="stay-modal">
                        <div className="stay-details">
                            <img src={stay.imgUrls[0]} />
                            <div className="stay-details-txt">
                                <h5 className="stay-type">{stay.type}</h5>
                                <h5 className="stay-summary">{stay.name}</h5>
                            </div>
                        </div>
                        <h2>Price details</h2>
                        <div className="price">
                            <div>$779.60 x 5 nights</div>
                            <div>$3,898.00</div>
                        </div>
                        <div>Total</div>
                    </div>
                </div>
            </section>}

        </div>
    )
}
