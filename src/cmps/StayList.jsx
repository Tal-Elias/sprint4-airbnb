import { StayPreview } from "./StayPreview";

export function StayList({ stays }) {
    return (
        <section className="stay-list">
            <ul className="clean-list">
                {stays.map(stay =>
                    <li key={stay._id}>
                        <StayPreview stay={stay} />
                    </li>
                )}
            </ul>
        </section>
    )
}