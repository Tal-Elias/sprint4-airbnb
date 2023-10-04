// import { useState } from 'react'
// import { useRef } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { SearchForm as StaySearchForm } from './search-form'
import { SearchBarButtons } from './SearchBarButtons'

export function StaySearchBar() {
    return (
        <div className='stay-search-bar'>
            <SearchBarButtons />
            {/* <StaySearchForm /> */}
            <div></div>
        </div>
    )
}