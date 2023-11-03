import { ListingPreview } from "./ListingPreview";

export function ListingList({stays}) {
    return (
        <div className="listing-list">
              <div className="header">
                <h3 className="listing">Listing</h3>
                <h3>Location</h3>
                <h3>Capacity</h3>
                <h3>Bedrooms</h3>
                <h3>Bathrooms</h3>
                <h3>Price/ night</h3>
            </div>
            {stays.map(stay =>
                <div key={stay._id}>
                    <ListingPreview stay={stay}/>
                </div>)}
        </div>


    )

}