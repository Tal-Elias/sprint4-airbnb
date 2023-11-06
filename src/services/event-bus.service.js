import toast from "react-hot-toast"

function createEventEmitter() {
    const listenersMap = {}
    // Trick for DEBUG
    window.mapmap = listenersMap
    return {
        // Use this function to subscribe to an event
        on(evName, listener) {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener]
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        // Use this function to emit an event
        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBusService = createEventEmitter()

export function showUserMsg(msg) {
    eventBusService.emit('show-user-msg', msg)
}
export function showSuccessMsg(txt, icon = '') {
    toast.success(txt, icon)
}
export function showErrorMsg(txt) {
    toast.error(txt)
}