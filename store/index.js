import { action, computed, observable } from 'mobx'

let store = null

const messages = [
    'nice to have you here',
    'i like you',
    'welcome <3',
    "let's drink a beer together mate!",
    'you look awesome today'
]

class Store {
    @observable helloMessage = ''

    constructor({ isServer, message } = {}) {
        this.helloMessage = message
            ? message
            : messages[Math.floor(Math.random() * (messages.length - 1))]
    }

    @action
    start = () => {
        this.timer = setInterval(() => {
            this.helloMessage =
                messages[Math.floor(Math.random() * (messages.length - 1))]
        }, 10000)
    }

    stop = () => clearInterval(this.timer)
}

// on server return new Store
// on browser return store instance
export default (obj = {}) =>
    !!(obj.isServer && typeof window === 'undefined')
        ? new Store(obj)
        : store === null ? (store = new Store(obj)) : store
