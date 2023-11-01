import { AiFillStar } from "react-icons/ai"
import { utilService } from "../../services/util.service"

export function ReviewRate({ reviews }) {

    const totalRating = reviews.reduce((acc, review) => acc + review.rate, 0)
    const averageRating = totalRating / reviews.length
    const formatedNumber = utilService.formatNumber(averageRating)

    return (
        <div className="review-rate">
            <AiFillStar />
            <span>{formatedNumber}</span>
        </div>
    )
}