import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service"
import { utilService } from "../services/util.service"
import { NavLink } from "react-router-dom"

export function UserPreviousOrderPreview({ order }) {
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
        <NavLink to={`/stay/${stay._id}`}>
            <section className="user-previous-order-preview">
                <img className="stay-img" src={stay.imgUrls[0]} alt="" />
                <div>
                    <div className="stay-loc">{stay.loc.city}</div>
                    <div className="details">Hosted by {stay.host.fullname}</div>
                    <div className="details">{utilService.formatDateRange(order.checkIn, order.checkOut) + ', ' + new Date(order.checkIn).getFullYear()}</div>
                </div>
            </section>
        </NavLink>
    )
}


