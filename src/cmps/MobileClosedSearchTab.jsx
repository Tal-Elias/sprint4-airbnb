export function MobileClosedSearchTab({ input, txt, setSelectedInput }) {
    function onSetSelectedInput(ev) {
        ev.stopPropagation()
        if (input === 'Where') setSelectedInput('destination')
        if (input === 'When') setSelectedInput('dates')
        if (input === 'Who') setSelectedInput('guests')



    }
    return (
        <div className="mobile-closed-search-tab" onClick={onSetSelectedInput}>
            <span className="input">{input}</span>
            <span>{txt}</span>
        </div>
    )
}