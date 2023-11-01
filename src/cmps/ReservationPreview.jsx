import { utilService } from "../services/util.service";

export function ReservationPreview({ order , onOrderRespond}) {

    function getStatusColor() {
        let statusColor
        switch (order.status) {
            case 'confirmed':
                statusColor = 'green'
                break;
            case 'rejected':
                statusColor = 'red'
                break;
            default:
                statusColor = 'orange'
        }
        return statusColor
    }
    return (
        <div className="reservation-preview">
            <h4 style={{ color: getStatusColor() }}>{order.status}</h4>
            <div>
                <h4>{order.buyer.fullname}</h4>
                <h5>{order.guests.adults}, {order.guests.children}</h5>
            </div>
            <h4>{utilService.timeStampToLongDate(order.checkIn)}</h4>
            <h4>{utilService.timeStampToLongDate(order.checkOut)}</h4>
            <h4>{order.stay.name}</h4>
            {/* <h4>Total: ${order.totalPrice}</h4> */}

            <button onClick={() => onOrderRespond(order, 'approved')}>Approve</button>
            <button onClick={() => onOrderRespond(order, 'declined')}>Decline</button>
        </div>
    )
}