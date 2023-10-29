export function GuestCounter({ field, value = 0, onChange }) {

    function handleIncrement() {
        onChange(field, value + 1)
    }

    function handleDecrement() {
        if (value > 0) {
            onChange(field, value - 1)
        }
    }

    return (
        <div className="guest-counter flex align-center space-between">
            <button
                disabled={!value > 0}
                className="btn-counter"
                onClick={handleDecrement}>
                <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
            </button>
            <div>{value}</div>
            <button
                className="btn-counter"
                onClick={handleIncrement}>
                <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
            </button>
        </div>
    )
}
