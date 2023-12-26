import { useEffect } from "react"
import { loadStays } from "../store/actions/stay.actions"
import { StayList } from "../cmps/StayList"
import { useSelector } from "react-redux"
import { saveUserWishlist } from "../store/actions/user.actions"
import { showErrorMsg } from "../services/event-bus.service"
import { IndexLoader } from "../cmps/IndexLoader"

export function UserWishList() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const user = useSelector(storeState => storeState.userModule.user)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)

    useEffect(() => {
        try {
            if (!user) return showErrorMsg('please Log in')
            loadStays({ pageIdx: 0, userWishlist: user.wishlist })
        } catch (err) {
            console.log('Cannot load wishlist', err);
            showErrorMsg('Cannot load wishlist')
        }
    }, [])

    async function onWishlist(stay) {
        try {
            saveUserWishlist(stay)
        } catch (err) {
            console.log('Cannot update user wishlist', err)
            showErrorMsg('Cannot update user wishlist')
        }
    }
    if (!stays && !user) return
    return (
        <section className="user-wishlist">
            {isLoading && <IndexLoader />}
            <h1>Wishlist</h1>
            {user.wishlist.length ? <StayList stays={stays} onWishlist={onWishlist} user={user} /> :
                <div className="create">
                    <h2>Create your first wishlist</h2>
                    <p>As you search, click the heart icon to save your favorite places to your wishlist.</p>
                </div>}
        </section>
    )
}