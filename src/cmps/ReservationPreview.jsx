import { useEffect, useState } from "react";
import { utilService } from "../services/util.service";

export function ReservationPreview({ order, onOrderRespond }) {

    function getStatusColor() {
        let statusColor
        switch (order.status) {
            case 'approved':
                statusColor = 'green'
                break;
            case 'declined':
                statusColor = 'red'
                break;
            default:
                statusColor = 'orange'
        }
        return statusColor
    }
    console.log(order)
    return (
        <div className="reservation-preview preview">
            <h4 style={{ color: getStatusColor() }}>{order.status}</h4>
            <div>
                <h4>{order.buyer.fullname}</h4>
                <h5>{order.guests.adults}, {order.guests.children}</h5>
            </div>
            <h4>{utilService.timeStampToLongDate(order.checkIn)}</h4>
            <h4>{utilService.timeStampToLongDate(order.checkOut)}</h4>
            <h4>{order.stay.name}</h4>
            <h4>${order.totalPrice}</h4>
            {order.status==='pending'&&
            <div className="action-btns">
                <button className="approve action " onClick={() => onOrderRespond(order, 'approved')}>Approve</button>
                <button className="decline action " onClick={() => onOrderRespond(order, 'declined')}>Decline</button>
            </div>}
        </div>
    )
}