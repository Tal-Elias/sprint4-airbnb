import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { loadOrders } from "../store/actions/order.actions"
import { orderService } from "../services/order.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { Reservations } from "../cmps/Reservations"
import { Listings } from "../cmps/Listings"
import { Performance } from "../cmps/Performance"
import { loadStays } from "../store/actions/stay.actions"

export function Dashboard() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [orders, setOrders] = useState(null)
    const stays = useSelector(storeState => storeState.stayModule.stays)


    useEffect(() => {
        loadOrders()
        loadStays({ page: 1, pageSize: 30, hostListing: user._id })
    }, [])

    async function loadOrders() {
        try {
            const orders = await orderService.query({ hostId: user._id })
            setOrders(orders)
        } catch (err) {
            console.log('Error while getting orders:', err)
            showErrorMsg('Cannot get orders')
        }
    }

    async function onOrderRespond(order, status) {
        order.status = status
        try {
            const updatedOrder = await orderService.save(order)
            console.log('order approval:', updatedOrder)
            showSuccessMsg('Order ' + status)
        } catch (error) {
            console.log('Error while updating order:', err)
            showErrorMsg('Cannot update order')
        }
    }

    if (!orders) return <div>is loading...</div>

    return (
        <section className="dashboard">
            <Reservations orders={orders} onOrderRespond={onOrderRespond}/>
            {/* <Listings stays={stays}/> */}
            {/* <Performance/> */}
            
        </section>
    )
}