import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { stayService } from "../services/stay.service.local.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from 'react-redux'
import { StayReservation } from "../cmps/StayReservation.jsx"
import { CiHeart } from 'react-icons/ci'
import { setCurrStay } from "../store/actions/stay.actions.js"

export function StayDetails() {
    // const [stay, setStay] = useState(null)
    const stay = useSelector((storeState) => storeState.stayModule.currStay)

    const { stayId } = useParams()

    const order = {
        startDate: "2025/10/15",
        endDate: "2025/10/17",
        adults: 1,
        kids: 2
    }
    // const orderUrl = new URLSearchParams(order).toString()

    useEffect(() => {
        setCurrStay(stayId)
    }, [stayId])

    if (!stay) return (
        <div>loading</div>
    )
    return (
        <section className="stay-details">
            <div className="details-header">
                <h1>{`${stay.name}`}</h1>
                <div className="save-btn-container">
                    <CiHeart />
                    <button className="save-btn">save</button>
                </div>
            </div>
            <Link to={`/stay/${stay._id}/order`}>
                <button>Reserve</button>
            </Link>
            <div className="imgs-container">
                {stay.imgUrls.map((url, idx) => <img key={idx} src={url} />)}
            </div>
            {/* <StayReservation stay={stay} /> */}
        </section>
    )
}