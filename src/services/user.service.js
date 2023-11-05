import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getUsers,
    remove,
    getLoggedinUser,
    update,
}
window.userService = userService

function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    const updatedUser = await httpService.put(`user/${user._id}`, { ...user })
    if (getLoggedinUser()._id === user._id) _setLoggedinUser(updatedUser)
    return updatedUser
}

async function login({ username, password }) {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    if (user) return _setLoggedinUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return _setLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return httpService.post('auth/logout')
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _setLoggedinUser(user) {
    const userToSet = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, isHost: user.isHost, wishlist: user.wishlist }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSet))
    return user
}

// ; (async () => {
//     await userService.signup({ fullname: 'Host', username: 'host', password: '123', isHost: true, _id: "SzgiV" })
//     await userService.signup({ fullname: 'Guest', username: 'guest', password: '123', isHost: false, _id: "dhbsb" })
// })()



