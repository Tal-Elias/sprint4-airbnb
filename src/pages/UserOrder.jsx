import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { showErrorMsg } from "../services/event-bus.service"
import { UserOrderList } from "../cmps/UserOrderList"
import { loadOrders } from "../store/actions/order.actions"
import { SOCKET_EVENT_ORDER_UPDATED, socketService } from "../services/socket.service"

export function UserOrder() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const orders = useSelector((storeState) => storeState.orderModule.orders)

    useEffect(() => {
        if (!user) return showErrorMsg('Please login')
        loadOrders({ buyerId: user._id })
        socketService.on(SOCKET_EVENT_ORDER_UPDATED, () => {
            loadOrders({ buyerId: user._id })
        })
    }, [])

    if (!orders || !user) return <div></div>

    return (
        <section className="user-trips">
            <UserOrderList orders={orders} />
        </section>
    )
}