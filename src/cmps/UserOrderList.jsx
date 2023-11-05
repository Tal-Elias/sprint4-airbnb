import { UserOrderPreview } from "./UserOrderPreview";

export function UserOrderList({ orders }) {
    return (
        <section className="user-order-list">
            <h1 className="trips">Trips</h1>
            <div className="upcoming">Upcoming reservations</div>

            <ul className="clean-list" >
                {orders.map(order =>
                    <li key={order._id}>
                        <UserOrderPreview order={order} />
                    </li>)}
            </ul>

        </section>

    )
}