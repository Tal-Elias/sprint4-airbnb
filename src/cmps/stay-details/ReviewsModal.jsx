import { ReviewPreview } from "./ReviewPreview"

export function ReviewsModal({ reviews, setReviewsModalOpen }) {

    return (
        <div className="reviews-modal ">
            <div className="overlay" onClick={() => setReviewsModalOpen(false)}></div>
            <div className="modal-content">
                <button onClick={() => setReviewsModalOpen(false)}>close</button>
                <h2 className="pb24">{reviews.length} reviews</h2>
                <div className="reviews-preview-container">
                    {reviews.map((review, idx) => {
                        return <ReviewPreview key={idx} review={review} isModal={true} />
                    })}
                </div>
            </div>
        </div>
    )
}