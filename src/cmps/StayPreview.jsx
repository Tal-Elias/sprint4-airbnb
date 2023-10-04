export function StayPreview({stay}) {
    return (
        <article className="stay-preview">
            <img src='https://www.brisbaneuniquehomes.com.au/wp-content/uploads/2018/04/builders-gold-coast-1-1-1024x683-1024x683.jpg'/>
            <div className="stay-info">
            <div className="stay-loc">{stay.loc.city}, {stay.loc.country}</div>
            <span className="stay-rate">{4.55}</span>
            <div>{stay.name}</div>
            <div className="stay-price">{stay.price} night</div>
            </div>
        </article>
    )
}