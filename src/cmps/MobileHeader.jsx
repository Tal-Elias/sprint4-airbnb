export function MobileHeader() {
    return (
        <header className="mobile-header full flex align-center">
            <div className="mobile-search-bar flex align-center">
                <div className="mobile-search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '20px', width: '20px', fill: 'currentcolor' }}><path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"></path></svg>
                </div>
                <div className="mobile-search-txt flex column">
                    <span className="anywhere flex">Anywhere</span>
                    <div style={{ display: 'flex' }}>
                        <div className="lower-section flex">
                            <span className="any-week">Any week</span>
                            <div className="seperator">•</div>
                            <span className="add-guests">Add guests</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="filter-icon flex align-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 4, overflow: 'visible' }}><path fill="none" d="M7 16H3m26 0H15M29 6h-4m-8 0H3m26 20h-4M7 16a4 4 0 1 0 8 0 4 4 0 0 0-8 0zM17 6a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 20a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 0H3"></path></svg>
                </div>
            </div>
        </header>
    )
}