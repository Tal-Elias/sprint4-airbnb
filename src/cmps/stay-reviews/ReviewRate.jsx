import { AiFillStar } from "react-icons/ai"

export function ReviewRate({ reviews }) {

    const totalRating = reviews.reduce((acc, review) => acc + review.rate, 0)
    const averageRating = totalRating / reviews.length
   
    function formatNumber(number) {
        if (Number.isInteger(number)) {
          // If the number is an integer (round number), display one digit after the decimal point
          return number.toFixed(1);
        } else {
          // If the number has a fractional part, display two digits after the decimal point
          return number.toFixed(2);
        }
      }
    return (
        <div className="review-rate">
            <AiFillStar />
            <span>{formatNumber(averageRating)}</span>
        </div>
    )
}