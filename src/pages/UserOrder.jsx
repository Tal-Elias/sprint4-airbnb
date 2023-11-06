import { useSelector } from "react-redux"
import { orderService } from "../services/order.service"
import { useEffect, useState } from "react"
import { showErrorMsg } from "../services/event-bus.service"
import { UserOrderList } from "../cmps/UserOrderList"

export function UserOrder () {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        loadOrders()
    }, [])

    async function loadOrders() {
        try {
            const orders = await orderService.query({ buyerId: user._id })
            setOrders(orders)
        } catch (err) {
            console.log('Error while getting orders:', err)
            showErrorMsg('Cannot get orders')
        }
    }

    if (!orders) return <div>Loading...</div>

    return (
        <section className="user-trips">
            <UserOrderList orders={orders}/>
        </section>
    )
}