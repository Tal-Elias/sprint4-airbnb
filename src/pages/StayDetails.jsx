import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { setCurrStay } from "../store/actions/stay.actions.js"
import { setCurrOrder } from "../store/actions/order.actions.js"
import { TbGridDots } from 'react-icons/tb'
import { OrderModal } from "../cmps/stay-details/OrderModal.jsx"
import test from '../assets/img/asset15.jpeg'
import { ReviewRate } from "../cmps/stay-reviews/ReviewRate.jsx"

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

    const [firstName] = stay.host.fullname.split(' ')

    return (
        <section className="stay-details">
            <div className="details-header">
                <h1>{`${stay.name}`}</h1>
            </div>
            <div className="img-container">
                <div className="img-grid">
                    {
                        stay?.imgUrls?.length > 0 &&
                        stay.imgUrls.map((url, idx) =>
                            <img key={idx}
                                src={url}
                                onClick={() => setShowAllPhotos(true)}
                            />)
                    }
                </div>
                <button onClick={() => setShowAllPhotos(true)} className="btn">
                    <div className="btn-inner-container">
                        <TbGridDots />
                        <span>Show all photos</span>
                    </div>
                </button>
            </div>
            <div className="full-details-container border-bottom">
                <div className="details-description">
                    <div className="short-summary border-bottom pb32">
                        <h1>{stay.summary}</h1>
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
                    <div className="hosted-by border-bottom ptb24 flex align-center gap24">
                        <img className="w40" src={stay.host.imgUrl} alt="" />
                        <h3>Hosted by {firstName}</h3>
                    </div>
                    <div className="selected-amenities border-bottom ptb32 flex column gap24">
                        {stay.amenities.slice(0, 3).map((amenity, idx) => (
                            <div key={idx} className="flex gap24">
                                <img className="w24" src={test} alt="" />
                                <h3>{amenity}</h3>
                            </div>
                        ))}
                    </div>
                    <div className="full-summary border-bottom pt32 pb48">
                        <p>{stay.summary}</p>
                        <button>Show nore {`>`}</button>
                    </div>
                    <div className="amenities border-bottom ptb48">
                        <h2 className="pb24">What this place offers</h2>
                        <div className="amenities-container flex column">
                            {
                                stay.amenities.map((amenity, idx) => (
                                    <div key={idx} className="amenity-container flex align-center">
                                        <img className="w24" src={test} alt="" />
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                        </div>
                        <div className="show-all-amenities">
                            <button className="btn">Show all ... amenities</button>
                        </div>
                    </div>
                    <div className="calendar ptb48">
                        <h2>5 nights in Tel Aviv-Yafo</h2>
                        <div className="date-range">
                            <span>Nov 18, 2023 - Nov 23, 2023</span>
                        </div>
                        <div className="cmp">Calendar CMP</div>
                    </div>
                </div>
                <OrderModal stay={stay} />
            </div>
            <section className="reviews border-bottom ptb48">
                <div className="reviews-header flex">
                    <ReviewRate reviews={stay.reviews} />
                    <span className="seperator">·</span>
                    <span>{stay.reviews.length} reviews</span>
                </div>
            </section>
        </section>
    )
}