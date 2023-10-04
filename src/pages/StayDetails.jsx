import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { stayService } from "../services/stay.service.local.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from 'react-redux'
import { StayReservation } from "../cmps/StayReservation.jsx"



export function StayDetails() {

    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const navigate = useNavigate()
    console.log('stayId', stayId)
    const order = {
        startDate:"2025/10/15",
        endDate:"2025/10/17",
        adults: 1,
        kids:2
    }
    const orderUrl= new URLSearchParams(order).toString()

    useEffect(() => {
        loadStay()
    }, [stayId])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log('Had issues in stay details', err)
            showErrorMsg('Cannot load stay')
            navigate('/stay')
        }
    }
    console.log(stay)
    if (!stay) return (
        <div>loading</div>
    )
    return (
        <section className="stay-details">
            <div className="details-header">
                <h1>{`${stay.name}`}</h1>
                <div className="save-btn-container">
                    <div>💓</div>
                    <button className="save-btn">save</button>
                </div>
            </div>
            <button onClick={() => navigate(`/book/${order._id}`)}>Reserve</button>
            <div className="imgs-container">
                {stay.imgUrls.map(url => <img src={url} />)}
            </div>
            <StayReservation stay = {stay} />
        </section>
    )
}