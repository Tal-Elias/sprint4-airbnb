import { ImageCarousel } from "./ImageCarousel";
import { ReviewRate } from "./stay-reviews/ReviewRate";

export function StayPreview({ stay }) {
    return (
        <article className="stay-preview">
            {/* <img className="stay-img" src={stay.imgUrls[0]} /> */}
            <ImageCarousel imgs={stay.imgUrls} />

            <div className="stay-info">
                <div className="stay-loc">{stay.loc.city}, {stay.loc.country}</div>
                <ReviewRate reviews={stay.reviews}/>
                {/* <span className="stay-rate"> <AiFillStar className="rate-star"/><span className="rate-num">{4.55}</span></span> */}
                <div className="stay-name">{stay.name}</div>
                <div className="stay-price">$ {stay.price} <span className="night">night</span></div>
            </div>
        </article>
    )
}