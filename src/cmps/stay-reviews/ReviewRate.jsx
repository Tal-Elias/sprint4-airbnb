import { AiFillStar } from "react-icons/ai"

export function ReviewRate({ reviews }) {

    const totalRating = reviews.reduce((acc, review) => acc + review.rate, 0)
    const averageRating = totalRating / reviews.length

    return (
        <div className="review-rate">
            <AiFillStar />
            <span>{averageRating}</span>
        </div>
    )
}