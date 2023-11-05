import { StayLabels } from "./StayLabels";

export function FilterLabels({ handleChange }) {
    return (
        <div className="filter-labels">
            <StayLabels handleChange={handleChange} />
            {/* <div className="filters">Filters</div> */}

        </div>
    )

}