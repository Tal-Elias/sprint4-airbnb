import { RegionOptions } from "./RegionOptions"

export function RegionSelect({ onSetField }) {

    // function onRegionSelect(region) {
    //     if (region === 'I\'m flexible') region = ''
    //     onSetField('destination', region)
    // }

    // const regions = [
    //     { name: 'I\'m flexible', imgUrl: 'https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg' },
    //     { name: 'Middle East', imgUrl: "https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg" },
    //     { name: 'Italy', imgUrl: 'https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg' },
    //     { name: 'United States', imgUrl: 'https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg' },
    //     { name: 'Greece', imgUrl: 'https://a0.muscache.com/im/pictures/f0ece7c0-d9b2-49d5-bb83-64173d29cbe3.jpg' },
    //     { name: 'South America', imgUrl: 'https://a0.muscache.com/im/pictures/06a30699-aead-492e-ad08-33ec0b383399.jpg' }
    // ]

    return (
        <div className="region-select" onClick={(e) => e.stopPropagation()}>
            <div className="region-select-header">Search by region</div>
            <RegionOptions onSetField={onSetField}/>
            {/* <div className="region-grid-container">
                {regions.map((region, idx) => {
                    return (
                        <div className="region" key={idx}>
                            <button className="btn-region" onClick={() => onRegionSelect(region.name)}>
                                <img src={region.imgUrl} alt={region.name} />
                            </button>
                            <div className="region-name">{region.name}</div>
                        </div>
                    )
                })}
            </div> */}
        </div>
    )
}