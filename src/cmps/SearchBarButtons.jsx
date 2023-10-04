// import { useParams } from 'react-router-dom'
// import { utilService } from '../../services/util.service'
// import { SearchBtn } from './search-btn'


export function SearchBarButtons() {

    return (
        <div className='search-bar-buttons' >
            <button className='search-anywhere'>Anywhere</button>
            <span className='splitter'></span>
            <button className='search-any-week'>Any week</button>
            <span className='splitter'></span>
            <button className='search-add-guests'>Add guests</button>
            {/* <SearchBtn /> */}
        </div>
    )
}