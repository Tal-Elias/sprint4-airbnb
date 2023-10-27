import { useEffect, useState } from "react"

export function SearchFormOptions() {
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        setExpanded(prevState => !prevState)
    }, [])

    return (
        <div className={`search-form-options ${expanded && 'expanded'}`}>
            <button>Stays</button>
            <button>Experiences</button>
            <button>Online Experiences</button>
        </div >
    )
}