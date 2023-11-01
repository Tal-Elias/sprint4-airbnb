import { ReservationsList } from "./ReservationsList";

export function Reservations({orders, onOrderRespond}) {
    return (
        <div>
            <h2>Reservations</h2>
            <ReservationsList orders={orders} onOrderRespond={onOrderRespond}/>
           
        </div>
    )
}