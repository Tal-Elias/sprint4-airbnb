import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service"
// import { stayService } from "../services/stay.service.local"
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


    if (!stay) return <div>loading</div>
    return (
        <div className="user-order-preview">
            <div className="order-details">
                <div className="stay-name">
                    <div>{order.stay.name} </div>
                    <div>hosted by {stay.host.fullname}</div>
                </div>
                <div className="dates-loc">
                    <div className="dates">
                        <div>{utilService.formatDateRange(order.checkIn, order.checkOut)}</div>
                        {/* <div>{utilService.timeStampToLongDate(order.checkOut)}</div> */}
                    </div>
                    <div className="loc">{stay.loc.address}</div>

                </div>

            </div>
            <div className="img-container">
                <img src={stay.imgUrls[0]} />
              <div className="status">{order.status}</div>

            </div>

        </div>

    )
}