import { userService } from "../../services/user.service";
import { store } from '../../store/store'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'
import { LOADING_DONE, LOADING_START } from "../reducers/system.reducer";
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER } from "../reducers/user.reducer";
import { socketService } from "../../services/socket.service";

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function saveUser(user) {
    try {
        // const userToSave = await userServiceTest.update(user)
        const userToSave = await userService.update(user)
        // store.dispatch({ type: UPDATE_USER, user: userToSave })
        store.dispatch({ type: SET_USER, user: userToSave })
        return userToSave
    } catch (err) {
        console.log('user action -> Cannot save user', err)
        throw err
    }
}


export async function saveUserWishlist(stay) {
    let liked
    const { user } = store.getState().userModule
    if (!user) return showErrorMsg('Please log in')
    const updatedUser = { ...user, wishlist: [...user.wishlist] }
    const stayIndex = updatedUser.wishlist.indexOf(stay._id)
    if (stayIndex !== -1) {
        updatedUser.wishlist.splice(stayIndex, 1)
        liked = false
    }
    else {
        updatedUser.wishlist.unshift(stay._id)
        liked = true
    }
    try {
        const msg = liked ? `${stay.name} added to wishlist` : `${stay.name} removed from wishlist`
        saveUser(updatedUser)
        showSuccessMsg(msg, { icon: '✔️' })
    } catch (err) {
        console.log('Cannot update user', err)
        showErrorMsg('Cannot update user')
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId);
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}