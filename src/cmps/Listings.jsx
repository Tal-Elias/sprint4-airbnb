import { Link } from "react-router-dom";

export function Listings({ stays }) {
    return (
        <div>
            <h2>Listings</h2>
            <Link to='stay/edit'>Create Listing</Link>
            {stays.map(stay =>
                <div key={stay._id}>
                    {stay._id}
                </div>)}
            
        </div>
    )
}