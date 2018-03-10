import Mixpanel from 'mixpanel-browser'
import { action, computed, observable, useStrict } from 'mobx'
useStrict(true)

let store = null

class Store {
    @observable loaded = false

    constructor({ loaded = false } = {}) {
        this.loaded = loaded
    }

    track = (event, json) => {
        if (this.loaded && typeof window !== 'undefined') {
            if (process.env.NODE_ENV !== 'development') {
                Mixpanel.track(event, json)
            }
        }
    }
    init = () => {
        if (typeof window !== 'undefined') {
            Mixpanel.init('c620e422e89994dd7b12940062990eb0')
            this.loaded = true
        }
    }
}

// on server return new Store
// on browser return store instance
export default (obj = {}) =>
    !!(obj.isServer && typeof window === 'undefined')
        ? new Store(obj)
        : store === null ? (store = new Store(obj)) : store
