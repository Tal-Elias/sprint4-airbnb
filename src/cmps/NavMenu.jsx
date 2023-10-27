import { useRef } from "react"
import { Link, NavLink } from "react-router-dom"
import { LoginSignup } from "./LoginSignup"
import routes from "../routes"
import useClickOutside from "../customHooks/useClickOutside"

export function NavMenu({ ...props }) {
    const user = props.user
    const elNavMenu = useRef()

    useClickOutside(elNavMenu, () => {
        if (props.isNavMenuOpen) props.setIsNavMenuOpen(false)
    })

    return (
        <div className="nav-menu" ref={elNavMenu}>
            {user &&
                <span className="user-info">
                    <Link to={`user/${user._id}`}>
                        {user.imgUrl && <img src={user.imgUrl} />}
                        {user.fullname}
                    </Link>
                    <button onClick={props.onLogout}>Logout</button>
                </span>
            }
            {!user &&
                <section className="user-info">
                    <LoginSignup onLogin={props.onLogin} onSignup={props.onSignup} />
                </section>
            }
            <nav className="nav-links flex column">
                {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
            </nav>
        </div>
    )
}