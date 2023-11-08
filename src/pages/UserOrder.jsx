import { useSelector } from "react-redux"
import { useEffect } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { UserOrderList } from "../cmps/UserOrderList"
import { loadOrders } from "../store/actions/order.actions"
import { SOCKET_EVENT_ORDER_UPDATED, socketService } from "../services/socket.service"

export function UserOrder() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const orders = useSelector((storeState) => storeState.orderModule.orders)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ORDER_UPDATED, () => {
            loadOrders({ buyerId: user._id })
        })
        try {
            loadOrders({ buyerId: user._id })
        } catch {
            console.log('Error while getting orders:', err)
            showErrorMsg('Cannot get orders')
        }
    }, [])

    if (!orders) return <div></div>

    return (
        <section className="user-trips">
            <UserOrderList orders={orders} />
        </section>
    )
}