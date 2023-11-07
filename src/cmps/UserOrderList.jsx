import { useEffect } from "react";
import { UserOrderPreview } from "./UserOrderPreview";
import { UserPreviousOrderPreview } from "./UserPreviousOrderPreview";

export function UserOrderList({ orders }) {
    const currentDate = new Date()


    return (
        <section className="user-order-list">
            <h1 className="trips">Trips</h1>
            <div className="upcoming headline">Upcoming reservations</div>

            <ul className="clean-list" >
                {orders.map(order => {
                    if (order.checkIn > currentDate) {
                        return <li key={order._id}>
                            <UserOrderPreview order={order} />
                        </li>
                    }
                }
                )
                }
            </ul>
            <div className="previous headline">Where you've been</div>
            <ul className="clean-list previous-orders" >
                {orders.map(order => {
                    if (order.checkIn <= currentDate) {
                        return <li key={order._id}>
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