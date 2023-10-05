import { useEffect} from "react";
import { addOrder, setCurrOrder } from "../store/actions/order.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { useSelector } from "react-redux";
import { orderService } from "../services/order.service.local";

export function StayOrder() {
    const order = useSelector((storeState) => storeState.orderModule.currOrder)
    const stay = useSelector((storeState) => storeState.stayModule.currStay)

    useEffect(() => {

        return ()=>{
           setCurrOrder(orderService.getEmptyOrder()) 
        }
    }, [])

    async function onOrder() {
        try {
            const savedOrder = await addOrder(order)
            showSuccessMsg(`Order added (id: ${savedOrder._id})`)
        } catch (err) {
            showErrorMsg('Cannot add order')
        }
    }

    return (
        <div>
            {order && stay && <section>

                <img className="order-stay-img" src={stay.imgUrls[0]} />
                <h5>{stay.type}</h5>
                <h5 className="stay-summary">{stay.summary}</h5>

                <h4>Your trip</h4>
                <h5>{order.startDate}</h5>
                <h5>{order.endDate}</h5>
                <button onClick={onOrder}>Confirm and pay</button>

            </section>}

        </div>
    )
}
