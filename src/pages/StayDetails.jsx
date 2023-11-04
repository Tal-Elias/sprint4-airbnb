import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { setCurrOrder } from "../store/actions/order.actions.js"
import { OrderModal } from "../cmps/stay-details/OrderModal.jsx"
import { ReviewRate } from "../cmps/stay-reviews/ReviewRate.jsx"
import { utilService } from "../services/util.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { stayService } from "../services/stay.service.local.js"
import { useSelector } from "react-redux"
import { DetailsLoader } from "../cmps/stay-details/DetailsLoader.jsx"
import { DatePickerModal } from "../cmps/stay-details/DatePickerModal.jsx"
import { ReviewBarGrid } from "../cmps/stay-details/ReviewBarGrid.jsx"
import { GoogleMap } from "../cmps/GoogleMap.jsx"

export function StayDetails() {
    const currOrder = useSelector((storeState) => storeState.orderModule.currOrder)
    const [orderToEdit, setOrderToEdit] = useState({})
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStay()
        setNewOrder()
    }, [])

    useEffect(() => {
        setCurrOrder(orderToEdit)
    }, [orderToEdit])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log('Had issues in stay details', err)
            showErrorMsg('Cannot load stay')
            navigate('/')
        }
    }

    function setNewOrder() {
        const dateRangeParams = {
            checkIn: +searchParams.get('checkIn') || utilService.getDemoTimestamp(7),
            checkOut: +searchParams.get('checkOut') || utilService.getDemoTimestamp(12),
        }
        const guestParams = {
            guests: +searchParams.get('guests') || 1,
            adults: +searchParams.get('adults') || 1,
            children: +searchParams.get('children') || 0,
            infants: +searchParams.get('infants') || 0,
            pets: +searchParams.get('pets') || 0
        }
        const newOrder = {
            ...currOrder,
            checkIn: dateRangeParams.checkIn,
            checkOut: dateRangeParams.checkOut,
            guestCount: guestParams.guests,
            guests: {
                adults: guestParams.adults,
                children: guestParams.children,
                infants: guestParams.infants,
                pets: guestParams.pets
            },
            stay: {
                _id: stayId
            }
        }
        setOrderToEdit(newOrder)
    }

    function clearDateRange() {
        const updatedOrder = {
            ...orderToEdit,
            checkIn: '',
            checkOut: ''
        }
        setOrderToEdit(updatedOrder)
    }

    function onSetField(field, value) {
        setOrderToEdit((prevFields) => ({ ...prevFields, [field]: value }))
    }

    function LongTxt(txt, length = 170) {
        const displayText = (txt.length > length) ? txt.slice(0, length) + '...' : txt
        return displayText
    }

    const { checkIn, checkOut } = orderToEdit
    const dateRangeFromOrder = {
        from: utilService.timeStampToLongDate(checkIn),
        to: utilService.timeStampToLongDate(checkOut)
    }

    const selectedAmenities = stayService.getSelectedAmenities()
    const firstSixReviews = utilService.getFirstSixReviewsFormatted(stay)


    return (
        <>
            {!stay && < DetailsLoader />}
            {showAllPhotos &&
                <div className="all-photos">
                    <button className="btn grey-bg scale underline" onClick={() => setShowAllPhotos(false)}>Close</button>
                    <div className="img-grid">
                        {
                            stay?.imgUrls?.length > 0 &&
                            stay.imgUrls.map((url, idx) => <img key={idx} src={url} />)
                        }
                    </div>
                </div>}
            {!!stay && !showAllPhotos &&
                <section className="stay-details">
                    <div className="details-header">
                        <h1>{`${stay.name}`}</h1>
                        <div className="header-actions">
                            <div className="reviews-loc">
                                <ReviewRate reviews={stay.reviews} bold={'bold'} />
                                <span>.</span>
                                <button className="btn underline">{utilService.checkIfPlural('review', (stay.reviews.length))}</button>
                                <span>.</span>
                                <button className="btn underline">{stay.loc.city}, {stay.loc.country}</button>
                            </div>
                            <div style={{ height: '28px' }}>
                                <div className="share-save">
                                    <button className="btn btn-share grey-bg flex scale underline">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 2, overflow: 'visible' }}><g fill="none"><path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v23V3zM6 13l9.3-9.3a1 1 0 0 1 1.4 0L26 13"></path></g></svg>
                                        <div className="">Share</div>
                                    </button>
                                    <button className="btn btn-save grey-bg flex scale underline">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 2, overflow: 'visible' }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
                                        <div className="">Save</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="img-container">
                        <div className="img-grid">
                            {stay?.imgUrls?.length > 0 &&
                                stay.imgUrls.map((url, idx) =>
                                    <img key={idx}
                                        src={url}
                                        onClick={() => setShowAllPhotos(true)}
                                    />)}
                        </div>
                        <button onClick={() => setShowAllPhotos(true)} className="btn scale">
                            <div className="btn-inner-container">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '16px', width: '16px', fill: 'currentcolor' }}><path fillRule="evenodd" d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"></path></svg>
                                <span>Show all photos</span>
                            </div>
                        </button>
                    </div>
                    {/* ///////////////////////////FULL-DETAILS/////////////////////////// */}
                    <div className="full-details-container border-bottom">
                        <div className="details-description">
                            <div className="short-summary flex border-bottom pb24">
                                <div style={{ flex: '0 1 100%' }}>
                                    <h1>{stay.roomType + ' hosted by ' + stay.host.fullname}</h1>
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
                                <div className="small-img-container">
                                    <img src={stay.host.thumbnailUrl} alt="" />
                                </div>
                            </div>
                            <div className="selected-amenities border-bottom ptb32 flex column gap24">
                                {selectedAmenities && selectedAmenities.map((amenity, idx) => (
                                    <div key={idx} className="selected-amenity-container flex gap24">
                                        <div className="flex justify-center" style={{ width: '40px' }}>
                                            <img className="w24" src={`../src/assets/img/amenities/${amenity.url}.svg`} alt="" />
                                        </div>
                                        <div className="selected-amenity-description flex column">
                                            <h3>{amenity.title}</h3>
                                            <span>{amenity.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="full-summary border-bottom pt32 pb48">
                                <p>{stay.summary}</p>
                                <button className="btn underline show-more">Show more
                                    <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{ height: '12px', width: '12px', display: 'block' }}><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd"></path></svg>
                                </button>
                            </div>
                            <div className="amenities border-bottom ptb48">
                                <h2 className="pb24">What this place offers</h2>
                                <div className="amenities-container flex column">
                                    {stay.amenities.slice(0, 10).map((amenity, idx) => (
                                        <div key={idx} className="amenity-container flex align-center">
                                            <img className="w24" src={`../src/assets/img/amenities/${amenity}.svg`} alt="" />
                                            <span>{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="show-all-amenities">
                                    <button className="btn scale show-all">Show all {stay.amenities.length} amenities</button>
                                </div>
                            </div>
                            <div className="calendar ptb48">
                                <h2>5 nights in Tel Aviv-Yafo</h2>
                                <div className="date-range">
                                    <span>Nov 18, 2023 - Nov 23, 2023</span>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <DatePickerModal
                                        onSetField={onSetField}
                                        detailsLayout='details-layout'
                                        clearDateRange={clearDateRange}
                                        dateRangeFromOrder={dateRangeFromOrder}
                                    />
                                </div>
                            </div>
                        </div>
                        <OrderModal
                            stay={stay}
                            onSetField={onSetField}
                            clearDateRange={clearDateRange}
                            dateRangeFromOrder={dateRangeFromOrder}
                        />
                    </div>
                    <section className="reviews-container border-bottom ptb48">
                        <div className="reviews-header flex">
                            <ReviewRate reviews={stay.reviews} />
                            <span className="seperator">·</span>
                            <span>{stay.reviews.length} reviews</span>
                        </div>
                        <ReviewBarGrid reviews={stay.reviews} />
                        <div className="reviews-preview-container flex">
                            {firstSixReviews.map((review, idx) => {
                                return (
                                    <div key={idx} className="review-preview">
                                        <div style={{ marginBlockEnd: '40px' }}>
                                            <div className="preview-header flex align-center">
                                                <img style={{ width: '40px', borderRadius: '2em' }} src={review.imgUrl} alt="" />
                                                <div className="flex column align-center">
                                                    <h3>{review.fullname}</h3>
                                                    <span>{review.at}</span>
                                                </div>
                                            </div>
                                            <div className="review-body">
                                                <div className="review-txt">{LongTxt(review.txt, 170)}</div>
                                                <button className="btn underline show-more">Show more
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentColor', strokeWidth: 5.33333, overflow: 'visible' }}><path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="show-all-reviews">
                            <button className="btn scale show-all">Show all {stay.reviews.length} reviews</button>
                        </div>
                    </section>
                    <div className="map-location border-bottom">
                        <div style={{ paddingBottom: '24px' }}>
                            <h1 className="map-location-header">Where you’ll be</h1>
                        </div>
                        <GoogleMap location={stay.loc} />
                        <div className="stay-address">
                            <h3>{stay.loc.address}</h3>
                            <div className="stay-location-desc">We take you to Terrasini, less than 50 minutes by car from the center of Palermo. Here we find everything you could want in your free time: the sea and the mountains, beautiful beaches, a nature reserve, watchtowers, good food, popular traditions still alive, a small marina, sunsets and enchanting views.</div>
                        </div>
                        <div style={{ marginTop: '16px' }}>
                            <button className="btn underline show-more">Show more
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentColor', strokeWidth: 5.33333, overflow: 'visible' }}><path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path></svg>
                            </button>
                        </div>
                    </div>
                </section>}
        </>
    )
}