import { useEffect } from "react"
import { loadStays } from "../store/actions/stay.actions"
import { StayList } from "../cmps/StayList"
import { useSelector } from "react-redux"

export function UserWishList() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const user = useSelector(storeState => storeState.userModule.user)
    console.log(stays)

    useEffect(() => {
        try {
            loadStays({page: 1, pageSize: 30 })
        } catch (err) {
            console.log(err);
            showErrorMsg('Cannot load stays')
        }
    }, [])

    async function onWishlist(stayId) {
        try {
            saveUserWishlist(stayId)
        } catch (err) {
            console.log('Cannot update user wishlist', err)
            showErrorMsg('Cannot update user wishlist')
        }
    }
    if (!stays && !user) return
    return <StayList stays={stays} onWishlist={onWishlist} user={user} />

}