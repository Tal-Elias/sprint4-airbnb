import { ReviewRate } from '../stay-reviews/ReviewRate'

export function OrderModal({ stay }) {

    const { price, reviews } = stay

    return (
        <div className="order-modal">
            <div className="header">
                <div className="price-per-night">
                    <span>${price}</span>
                    <span>night</span>
                </div>
                <div className="reviews">
                    <ReviewRate reviews={reviews} />
                    <span className="seperator">·</span>
                    <span>{reviews.length}</span>
                </div>
            </div>
        </div>
    )
}