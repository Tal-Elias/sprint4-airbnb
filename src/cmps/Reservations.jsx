import { ReservationsList } from "./ReservationsList";

export function Reservations({ orders, onOrderRespond }) {
    return (
        <ReservationsList orders={orders} onOrderRespond={onOrderRespond} />
    )
}