export function ListingPreview({ stay }) {
    return (
        <div className="listing-preview preview">
            <div className="stay-img">
                <img src={stay.imgUrls[0]} />
            </div>
            <h4>{stay.name}</h4>
            <h4>{stay.loc.country}, {stay.loc.city}</h4>
            <h4>{stay.capacity}</h4>
            <h4>{stay.bedrooms}</h4>
            <h4>{stay.bathrooms}</h4>
            <h4>${stay.price}</h4>
        </div>
    )
}