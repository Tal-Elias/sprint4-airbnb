import { HostOrderList } from "./HostOrderList";

export function HostOrder({ orders, onOrderRespond }) {
    return (
        <HostOrderList orders={orders} onOrderRespond={onOrderRespond} />
    )
}