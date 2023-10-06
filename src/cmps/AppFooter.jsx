
export function AppFooter({ isDetailsPage }) {
    return (
        <footer className={`app-footer full ${isDetailsPage ? 'details-layout' : 'main-layout'}`}>
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
        </footer>
    )
}