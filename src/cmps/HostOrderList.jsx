import { HostOrderPreview } from "./HostOrderPreview";

export function HostOrderList({ orders, onOrderRespond }) {
    return (
        <section className="host-order-list">
            <ul className="clean-list">
                {orders.map(order => <li key={order._id}>
                    <HostOrderPreview order={order} onOrderRespond={onOrderRespond} />
                </li>)}
            </ul>
        </section>
    )

}