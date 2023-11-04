import { Link } from 'react-router-dom'
import { StayPreview } from './StayPreview'

export function StayList({ stays, updatedSearchParams, onWishlist, user }) {
    const params = new URLSearchParams(updatedSearchParams).toString()
    
    return (
        <section >
            <ul className="stay-list clean-list">
                {stays.map(stay =>
                    <li key={stay._id}>
                        <Link to={`/stay/${stay._id}?${params}`}>
                            <StayPreview stay={stay} onWishlist={onWishlist} user={user} />
                        </Link>
                    </li>
                )}
            </ul>
        </section>
    )
}