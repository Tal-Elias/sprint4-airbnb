import { UserOrderPreview } from "./UserOrderPreview";

export function UserOrderList({ orders }) {
    return (
        <ul className="clean-list">
            {orders.map(order =>
                <li key={order._id}>
                    <UserOrderPreview order={order} />
                </li>)}
        </ul>

    )
}