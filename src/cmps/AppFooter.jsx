
import { UserMsg } from './UserMsg'

export function AppFooter() {
    return (
        <footer className="app-footer main-layout full">
            <div className="site-info">
                <span> © 2023 Hairbnb, Inc.</span>
                <span className="seperator">·</span>
                <a href="#">Terms</a>
                <span className="seperator">·</span>
                <a href="#">Sitemap</a>
                <span className="seperator">·</span>
                <a href="#">Privacy</a>
                <span className="seperator">·</span>
                <a href="#">Your Privacy Choices</a>
            </div>
            <UserMsg />
        </footer>
    )
}