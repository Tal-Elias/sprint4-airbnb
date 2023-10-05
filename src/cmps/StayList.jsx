import { StayPreview } from "./StayPreview";
import { Link } from 'react-router-dom'

export function StayList({ stays }) {
    return (
        <section >
            <ul className="stay-list clean-list">
                {stays.map(stay =>
                    <li key={stay._id}>
                        <Link to={`/stay/${stay._id}`}>
                            <StayPreview stay={stay} />
                        </Link>
                    </li>
                )}
            </ul>
        </section>
    )
}