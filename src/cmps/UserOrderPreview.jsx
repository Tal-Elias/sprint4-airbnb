import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service.local"
import { showErrorMsg } from "../services/event-bus.service"
import { utilService } from "../services/util.service"

export function UserOrderPreview({ order }) {
    const [stay, setStay] = useState(null)
    useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        try {
            const stay = await stayService.getById(order.stay._id)
            setStay(stay)
        } catch (err) {
            console.log('Had issues in stay details', err)
            showErrorMsg('Cannot load stay')
        }
    }
    if (!stay) return
    return (
        <div className="user-order-preview">
            <div className="order-details">
                <div className="stay-name">
                    <div>{order.stay.name} </div>
                    <div>hosted by {stay.host.fullname}</div>
                </div>
                <div className="dates-loc">
                    <div className="dates">
                        <div>{utilService.timeStampToLongDate(order.checkIn)}</div>
                        <div>{utilService.timeStampToLongDate(order.checkOut)}</div>
                    </div>
                    <div>{stay.loc.address}</div>
                    {/* <div>{order.status}</div> */}

                </div>

            </div>
            {/* <div style={{ width: '50%' }}> */}
                <img src={stay.imgUrls[0]} />
            {/* </div> */}
        </div>

    )
}