import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { stayService } from "../services/stay.service.local.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from 'react-redux'
import { StayReservation } from "../cmps/StayReservation.jsx"
import { CiHeart } from 'react-icons/ci'
import { setCurrStay } from "../store/actions/stay.actions.js"
import { setCurrOrder } from "../store/actions/order.actions.js"
import { TbGridDots } from 'react-icons/tb'
import { OrderModal } from "../cmps/stay-details/OrderModal.jsx"

export function StayDetails() {
    // const [stay, setStay] = useState(null)
    const stay = useSelector((storeState) => storeState.stayModule.currStay)
    const order = useSelector((storeState) => storeState.orderModule.currOrder)
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    const { stayId } = useParams()

    function handleChange() {
        if (!stay) return
        const updatedOrder = {
            hostId: stay.host._id,
            startDate: "2025/10/15",
            endDate: "2025/10/17",
            guests: {
                adults: 1,
                kids: 2
            },
            stay: {
                _id: stay._id,
                name: stay.name,
                price: stay.price
            }
        }
        setCurrOrder(updatedOrder)
        // setCurrOrder((prevOrder)=>({...prevOrder,...updatedOrder}))

    }
    useEffect(() => {
        setCurrStay(stayId)
    }, [])

    useEffect(() => {
        handleChange()
    }, [stay])

    if (!stay) return (
        <div>loading</div>
    )

    if (showAllPhotos) {
        return <div className="all-photos">
            <button onClick={() => setShowAllPhotos(false)}>Close</button>
            <div className="img-grid">
                {
                    stay?.imgUrls?.length > 0 &&
                    stay.imgUrls.map((url, idx) => <img key={idx} src={url} />)
                }
            </div>
        </div>
    }

    return (
        <section className="stay-details">
            <Link to={'/stay/order'}>
                <button>Reserve</button>
            </Link>
            <div className="details-header">
                <h1>{`${stay.name}`}</h1>
            </div>
            <div className="img-container">
                <div className="img-grid">
                    {
                        stay?.imgUrls?.length > 0 &&
                        stay.imgUrls.map((url, idx) => <img key={idx} src={url} />)
                    }
                </div>
                <button onClick={() => setShowAllPhotos(true)} className="btn">
                    <div className="btn-inner-container">
                        <TbGridDots />
                        <span>Show all photos</span>
                    </div>
                </button>
            </div>
            <div className="full-details-container">
                <div className="details-description">
                    <h1>Fantastic duplex apartment in Portugal</h1>
                    <ul className="flex clean-list">
                        <li>{stay.capacity} guests</li>
                        <span className="seperator">·</span>
                        <li>{stay.type}</li>
                        <span className="seperator">·</span>
                        <li>1 bed</li>
                        <span className="seperator">·</span>
                        <li>1 bath</li>
                    </ul>
                </div>
                <OrderModal stay={stay} />
            </div>
        </section>
    )
}

{/* <section className="stay-details">
            <div className="details-header">
                <h1>{`${stay.name}`}</h1>
                <div className="btn-save-container">
                    <div>💓</div>
                    <button className="btn-save">save</button>
                </div>
            </div>
            <Link to={`/stay/order`}>
                <button>Reserve</button>
            </Link>
            <div className="imgs-container">
                {stay.imgUrls.map((url, idx) => <img key={idx} src={url} />)}
            </div> */}
{/* <StayReservation stay={stay} /> */ }
{/* </section> */ }