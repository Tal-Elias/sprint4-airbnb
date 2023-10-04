import { Link } from 'react-router-dom'

export function StayPreview({ stay }) {
    return (
        <article className="stay-preview">
                <img className="stay-img" src={stay.imgUrls[0]} />
                <div className="stay-info">
                    <div className="stay-loc">{stay.loc.city}, {stay.loc.country}</div>
                    <span className="stay-rate">{4.55}</span>
                    <div>{stay.name}</div>
                    <div className="stay-price">{stay.price} night</div>
                </div>
        </article>
    )
}