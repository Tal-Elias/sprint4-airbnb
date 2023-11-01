import { AiFillStar } from "react-icons/ai"
import { utilService } from "../../services/util.service"

export function ReviewRate({ reviews, bold }) {

    const totalRating = reviews.reduce((acc, review) => acc + review.rate, 0)
    const averageRating = totalRating / reviews.length
    const formatedNumber = utilService.formatNumber(averageRating)

    return (
        <div className={`review-rate ${bold ? bold : ''}`}>
            <AiFillStar />
            <span>{formatedNumber}</span>
        </div>
    )
}