import { useSelector } from "react-redux"
import { useRef } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { LoginSignup } from "./LoginSignup"
import { login, logout, signup } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import routes from "../routes"
import useClickOutside from "../customHooks/useClickOutside"

export function NavMenu({ ...props }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const elNavMenu = useRef()
    const navigate = useNavigate()

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            props.setIsNavMenuOpen(false)
        } catch (err) {
            console.log('cannot log in:', err)
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
            navigate('/')
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    useClickOutside(elNavMenu, () => {
        if (props.isNavMenuOpen) props.setIsNavMenuOpen(false)
    })

    return (
        <div className="nav-menu" ref={elNavMenu}>
            {user &&
                <span className="user-info">
                    <Link to={`user/${user._id}`}>
                        {user.imgUrl && <img src={user.imgUrl} style={{ width: '40px', borderRadius: '2em' }}/>}
                        {user.fullname}
                    </Link>
                    <button onClick={onLogout}>Logout</button>
                </span>
            }
            {!user &&
                <section className="user-info">
                    <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                </section>
            }
            <nav className="nav-links flex column">
                {routes.map(route => <NavLink key={route.path} to={route.path} onClick={() => props.setIsNavMenuOpen(false)}>{route.label}</NavLink>)}
            </nav>
        </div>
    )
}