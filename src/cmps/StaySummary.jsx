import { ReviewRate } from "./stay-reviews/ReviewRate";

export function StaySummary({ stay }) {
    return (
        <div className="stay-summary">
            <div>
                <img src={stay.imgUrls[0]} />
            </div>
            <div className="stay-summary-txt">
                <div >
                    <h5 className="stay-type">{stay.type}</h5>
                    <h5 className="stay-name">{stay.name}</h5>
                </div>
                <div className="flex reviews">
                    <ReviewRate reviews={stay.reviews} />
                    <div className="reviews-count">{'(' + stay.reviews.length + ')'}</div>
                </div>
            </div>
        </div>
    )
}