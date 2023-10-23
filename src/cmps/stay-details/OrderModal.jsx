import { Link } from 'react-router-dom'
import { ReviewRate } from '../stay-reviews/ReviewRate'

export function OrderModal({ stay }) {

    const { price, reviews } = stay

    return (
        <div className="order-modal">
            <div className="header">
                <div className="price-per-night">
                    <span className="price">${price} </span>
                    <span className="night">night</span>
                </div>
                <div className="reviews">
                    <ReviewRate reviews={reviews} />
                    <span className="seperator">·</span>
                    <span>{reviews.length}</span>
                </div>
            </div>
            <div className="order-edit-container">
                <div className="date-picker flex">
                    <div className="check-in flex column">
                        <span>CHECK-IN</span>
                        <span>Add date</span>
                    </div>
                    <div className="checkout flex column">
                        <span>CHECKOUT</span>
                        <span>Add date</span>
                    </div>
                </div>
                <div className="guest-picker">
                    <input type="text" placeholder="Add guests" />
                </div>
            </div>
            <Link to={'/stay/order'}>
                <button>Reserve</button>
            </Link>
        </div>
    )
}