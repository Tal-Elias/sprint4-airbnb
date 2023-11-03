import { Link } from "react-router-dom";
import { ListingList } from "./ListingList";

export function Listings({ stays }) {
    return (
        <div className="listings">
            <Link className="create-listing" to='stay/edit'>Create Listing</Link>
            <ListingList stays={stays} />
        </div>
    )
}