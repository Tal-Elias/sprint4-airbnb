import { utilService } from "../services/util.service";

export function HostOrderPreview({ order, onOrderRespond }) {

        function getStatusColor() {
            let statusColor
            switch (order.status) {
                case 'approved':
                    statusColor = '#008489'
                    break;
                case 'declined':
                    statusColor = '#FF5A5F'
                    break;
                default:
                    statusColor = '#FFB400'
            }
            return statusColor
        }
    return (
        <div className="host-order-preview preview">
            <div className="buyer">
                <img src={order.buyer.imgUrl} style={{ width: '40px', borderRadius: '2em' }} />
                <h4 className="guest-name">{order.buyer.fullname}</h4>
                <h5 className="guests">{utilService.checkIfPlural('guest', order.guestCount)}</h5>
            </div>
            <div className="status" style={{ color: getStatusColor() }}>{utilService.capitalizeFirstLetter(order.status)}</div>
            <h4 className="check-in">{utilService.timeStampToLongDate(order.checkIn)} - {utilService.timeStampToLongDate(order.checkOut)}</h4>
            {/* <h4 className="check-out">{utilService.timeStampToLongDate(order.checkOut)}</h4> */}
            <h4 className="stay-name">{order.stay.name}</h4>
            <h4 className="price">${order.totalPrice} <span>  total</span></h4>
            {order.status === 'pending' &&
                <div className="action-btns">
                    <button className="btn btn-approve action " onClick={() => onOrderRespond(order, 'approved')}>Approve</button>
                    <button className="btn btn-decline action " onClick={() => onOrderRespond(order, 'declined')}>Decline</button>
                </div>}
        </div>
    )
}