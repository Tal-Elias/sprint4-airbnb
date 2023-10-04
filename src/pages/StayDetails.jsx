import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { stayService } from "../services/stay.service.local.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from 'react-redux'



export function StayDetails() {

    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const navigate = useNavigate()
    console.log('stayId', stayId)

    useEffect(() => {
        loadStay()
    }, [stayId])

    async function loadStay() {
        console.log('dddddddddddddddddddddddddddd')
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
            <img src={`${stay.imgUrls[0]}`} />
            <div className="imgs-container">
                {stay.imgUrls.map(url => <img src={url} />)}
            </div>
            {/* <img src={`${stay.imgUrls[3]}`} /> */}
        </section>
    )
}