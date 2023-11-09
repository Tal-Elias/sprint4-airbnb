import { useEffect } from "react";
import { UserOrderPreview } from "./UserOrderPreview";
import { UserPreviousOrderPreview } from "./UserPreviousOrderPreview";

export function UserOrderList({ orders }) {
    const currentDate = new Date()


    return (
        <section className="user-order-list">
            <h1 className="trips">Trips</h1>
            <ul className="clean-list" >
                {orders.map(order => {
                    if (order.checkIn > currentDate) {
                        return <li key={order._id}>
                            <div className="upcoming headline">Upcoming reservations</div>
                            <UserOrderPreview order={order} />
                        </li>
                    }
                }
                )
                }
            </ul>
            <ul className="clean-list previous-orders" >
                {orders.map(order => {
                    if (order.checkIn <= currentDate) {
                        return <li key={order._id}>
                            <div className="previous headline">Where you've been</div>
                            <UserPreviousOrderPreview order={order} />
                        </li>
                    }
                }
                )
                }
            </ul>

        </section>

    )
}