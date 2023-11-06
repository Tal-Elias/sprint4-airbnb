import { utilService } from "../../services/util.service"

export function OrderPriceSum({ checkIn, checkOut, price, cleaningFee}) {

    const SERVICE_FEE = 11.2
    const totalNights = utilService.getTotalNights(checkIn, checkOut)
    const totalNightPrice = price * totalNights
    const serviceFee = Math.round(SERVICE_FEE * totalNights)
    const totalPrice = totalNightPrice + serviceFee + cleaningFee

    return (
        <div className="order-price-sum">
            <div className="no-charge-msg flex justify-center"><span>You won't be charged yet</span></div>
            <div className="price-calc-container flex column">
                <div className="total-nights flex space-between">
                    <div className="nights-calc underline">${(price)} x {utilService.checkIfPlural(' night', totalNights)}</div>
                    <div className="night-sum">${totalNightPrice}</div>
                </div>
                <div className="cleaning-fee-container flex space-between">
                    <div className="cleaning-txt underline">Cleaning fee</div>
                    <div className="cleaning-sum">${cleaningFee}</div>
                </div>
                <div className="service-fee-container flex space-between">
                    <div className="service-txt underline">Hairbnb service fee</div>
                    <div className="service-sum">${serviceFee}</div>
                </div>
            </div>
            <div className="total-price-container flex space-between pt24">
                <div className="total-txt">Total</div>
                <div className="total-price">${totalPrice}</div>
            </div>
        </div>
    )
}
