import { useEffect, useState } from 'react'
import { StaySearchBar } from './StaySearchBar'
import { NavHamburger } from './NavHamburger'
import { Logo } from './Logo'
import { NavMenu } from './NavMenu'
import { SearchBarForm } from './SearchBarForm'
import { SearchFormOptions } from './SearchFormOptions'
import { setFilter } from '../store/actions/stay.actions'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { showSuccessMsg } from '../services/event-bus.service'
// import { SOCKET_EVENT_NEW_ORDER, SOCKET_EVENT_ORDER_UPDATED, socketService } from '../services/socket.service'
import useEventListener from '../customHooks/useEventListener'

export function DesktopHeader({ isSecondaryLayout ,user}) {
    // const user = useSelector(storeState => storeState.userModule.user)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
    const [selectedInput, setSelectedInput] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    // useEffect(() => {
    //     setFilterByParams()
    // }, [])

    // useEffect(() => {
    //     if (!user) return
    //     socketService.on(SOCKET_EVENT_ORDER_UPDATED, () => {
    //         showSuccessMsg('Order status has been updated')
    //     })
    //     socketService.on(SOCKET_EVENT_NEW_ORDER, () => {
    //         console.log('new order arrived');
    //         // showSuccessMsg(`New order has arrived`)
    //     })
    //     return () => {
    //         socketService.off(SOCKET_EVENT_ORDER_UPDATED)
    //         socketService.off(SOCKET_EVENT_NEW_ORDER)
    //     }
    // }, [user])

    // function setFilterByParams() {
    //     if (!searchParams.size) return
    //     const filterByParams = {
    //         ...filterBy,
    //         txt: searchParams.get('destination') || '',
    //         label: searchParams.get('label') || '',
    //         guests: +searchParams.get('guests') || 0
    //     }
    //     setFilter({ ...filterByParams })
    // }

    // function onSetFilter(searchFormIputs) {
    //     const { pageIdx } = filterBy
    //     setFilter({ ...searchFormIputs, txt: searchFormIputs.destination, pageIdx })
    //     setSearchParams(searchFormIputs)
    //     const searchString = new URLSearchParams(searchFormIputs)
    //     if (isSecondaryLayout) navigate(`/?${searchString}`)
    // }

    function handleScroll() {
        if (window.scrollY > 0) setIsSearchBarOpen(false)
    }

    useEventListener('scroll', handleScroll)

    return (
        <header className={`app-header full ${isSecondaryLayout ? 'secondary-layout' : 'main-layout sticky'} ${isSearchBarOpen ? 'expanded' : ''}`}>
            <div className='header-container'>
                <Logo />
                {!isSearchBarOpen &&
                    <StaySearchBar
                        filterBy={filterBy}
                        setSelectedInput={setSelectedInput}
                        setIsSearchBarOpen={setIsSearchBarOpen}
                    />}
                {isSearchBarOpen &&
                    <SearchFormOptions
                        isSearchBarOpen={isSearchBarOpen}
                    />}
                <div className="nav-container" style={{ position: 'relative' }}>
                    <NavHamburger
                        user={user}
                        isNavMenuOpen={isNavMenuOpen}
                        setIsNavMenuOpen={setIsNavMenuOpen}
                    />
                    {isNavMenuOpen &&
                        <NavMenu
                            isNavMenuOpen={isNavMenuOpen}
                            setIsNavMenuOpen={setIsNavMenuOpen}
                        />}
                </div>
            </div>
            {isSearchBarOpen &&
                <SearchBarForm
                    filterBy={filterBy}
                    // onSetFilter={onSetFilter}
                    selectedInput={selectedInput}
                    setSelectedInput={setSelectedInput}
                    setIsSearchBarOpen={setIsSearchBarOpen}
                    // onSearch={onSearch}
                />}
        </header>
    )
}