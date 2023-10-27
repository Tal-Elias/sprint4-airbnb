export function Backdrop({ setIsSearchBarOpen }) {

    return (
        <div
            className="backdrop"
            onClick={() => setIsSearchBarOpen(false)}>
        </div>
    )
}