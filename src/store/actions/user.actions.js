import { userService } from "../../services/user.service";
import { store } from '../../store/store'

import { showErrorMsg } from '../../services/event-bus.service.js'
import { LOADING_DONE, LOADING_START } from "../reducers/system.reducer";
import { REMOVE_USER, UPDATE_USER, SET_USER, SET_USERS, SET_WATCHED_USER } from "../reducers/user.reducer";

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
        const userToSave = await userService.save(user)
        // store.dispatch({ type: UPDATE_USER, user: userToSave })
        store.dispatch({ type: SET_USER, user: userToSave})
        return userToSave
    } catch (err) {
        console.log('user action -> Cannot save user', err)
        throw err
    }
}


export async function saveUserWishlist(stayId) {
    const { user } = store.getState().userModule
    if (!user) return showErrorMsg('Please log in')
    const updatedUser = { ...user, wishlist: [...user.wishlist] }
    const stayIndex = updatedUser.wishlist.indexOf(stayId)
    if (stayIndex !== -1) updatedUser.wishlist.splice(stayIndex, 1)
    else updatedUser.wishlist.unshift(stayId)
    try {
        saveUser(updatedUser)
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