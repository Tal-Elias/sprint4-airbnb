import { StayPreview } from "./StayPreview";
import { useNavigate } from 'react-router-dom'

export function StayList({ stays }) {
    const navigate = useNavigate()
    return (
        <section >
            <ul className="clean-list stay-list">
                {stays.map(stay =>
                    <li key={stay._id} onClick={() => navigate(`/stay/${stay._id}`)}>
                        <StayPreview stay={stay} />
                    </li>
                )}
            </ul>
        </section>
    )
}