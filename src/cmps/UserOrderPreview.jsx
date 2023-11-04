export function UserOrderPreview({ order }) {
    return (
        <div className="user-order-preview">
            <div>
                <h2>{order.stay.name}</h2>
                <div>
                    <h2>{order.checkIn}</h2>
                    <h2>{order.checkOut}</h2>
                </div>

                <h2>{order.status}</h2>
            </div>

            <img src="https://www.google.co.il/search?q=house&sca_esv=579494868&tbm=isch&sxsrf=AM9HkKnvMBvmyjvN0Gdo6p47gsDyE3tANg:1699126846777&source=lnms&sa=X&ved=2ahUKEwiViYXhjKuCAxXc_rsIHQRGBbsQ_AUoAXoECAMQAw&biw=1528&bih=708&dpr=1.25#imgrc=v7xpow4nqIVxvM" />
        </div>

    )
}