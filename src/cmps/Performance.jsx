import { AverageRating } from "./AverageRating";
import { IncomePerMonth } from "./IncomePerMonth";

export function Performance() {
    return (
        <div className="performance">
            <div className="wishlist-average average">
                <h3>Average wishlist additions</h3>
                <h2>11 <span>/month</span></h2>
            </div>
            <div className="orders-average average">
                <h3>Average orders</h3>
                <h2>13 <span>/month</span></h2>
            </div>
            <div className="cancellation-rate average">
                <h3>Cancellation rate</h3>
                <h2>31.7% <span>/month</span></h2>
            </div>
            <AverageRating />
            <IncomePerMonth />
        </div>
    )
}