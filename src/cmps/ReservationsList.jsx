import { ReservationPreview } from "./ReservationPreview";

export function ReservationsList({ orders, onOrderRespond }) {
    return (
        <section className="reservations-list">

            <div className="header">
                <h3>Status</h3>
                <h3>Guests</h3>
                <h3>Check-in</h3>
                <h3>Checkout</h3>
                <h3>Listing</h3>
                {/* <h3>Total: ${order.totalPrice}</h3> */}
            </div>
            <ul className="clean-list">
                {orders.map(order => <li key={order._id}>
                    <ReservationPreview order={order} onOrderRespond={onOrderRespond}/>

                </li>)}
            </ul>
        </section>
    )

}