import { useSelector } from "react-redux"
import { orderService } from "../services/order.service"
import { useEffect, useState } from "react"
import { showErrorMsg } from "../services/event-bus.service"
import { UserOrderList } from "../cmps/UserOrderList"
import { loadOrders } from "../store/actions/order.actions"

export function UserOrder() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const orders = useSelector((storeState) => storeState.orderModule.orders)

    useEffect(() => {
        try {
            loadOrders({ buyerId: user._id })
        } catch {
            console.log('Error while getting orders:', err)
            showErrorMsg('Cannot get orders')
        }
    }, [])

    if (!orders) return <div>Loading...</div>

    return (
        <section className="user-trips">
            <UserOrderList orders={orders} />
        </section>
    )
}