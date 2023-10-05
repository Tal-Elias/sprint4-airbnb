import { StayPreview } from "./StayPreview";
import { Link } from 'react-router-dom'

export function StayList({ stays }) {
    return (
        <section >
            <ul className="stay-list clean-list">
                {stays.map(stay =>
                    <Link to={`/stay/${stay._id}`}>
                        <li key={stay._id}>
                            <StayPreview stay={stay} />
                        </li>
                    </Link>
                )}
            </ul>
        </section>
    )
}