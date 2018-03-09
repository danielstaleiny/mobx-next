import { action, computed, observable, useStrict } from 'mobx'
useStrict(true)

let store = null

class Store {
    @observable profile = {}
    @observable token

    constructor({ isServer, profile = {}, token } = {}) {
        this.profile = profile
        this.token = token
    }

    @computed
    get isLogin() {
        return !!this.token
    }

    @action
    getProfile = async () => {
        if (this.token) {
            // const res = await get("me", {token: this.token})
            this.profile = { name: 'dan' }
        }
    }

    setSessionStorage = () => {
        if (this.profile && this.token && typeof window !== 'undefined')
            window.sessionStorage.setItem(
                'session',
                JSON.stringify({
                    token: this.token,
                    profile: this.profile
                })
            )
    }

    @action
    getSessionStorage = () => {
        if (!this.profile && typeof window !== 'undefined') {
            const { profile, token } = JSON.parse(
                window.sessionStorage.getItem('session')
            )
            if (profile) this.profile = profile
            if (token) this.token = token
        }
    }

    @action
    login = (name, pw) => {
        // const res = await post(`/profiles/${name}`, {password: pw})
        this.token = 'token'
        if (typeof window !== 'undefined') {
            const Cookie = require('js-cookie')
            if (process.env.NODE_ENV === 'production')
                Cookie.set('token', this.token, { secure: true })
            else Cookie.set('token', this.token)
        }
        this.setSessionStorage()
    }

    @action
    logout = () => {
        this.token = undefined
        this.profile = {}
        if (typeof window !== 'undefined') {
            window.sessionStorage.removeItem('session')
            const Cookie = require('js-cookie')
            const token = Cookie.remove('token')
        }
    }
}

// on server return new Store
// on browser return store instance
export default (obj = {}) =>
    !!(obj.isServer && typeof window === 'undefined')
        ? new Store(obj)
        : store === null ? (store = new Store(obj)) : store
