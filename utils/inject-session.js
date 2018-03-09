import initStoreSession from '~/store/session'

export default async ctx => {
    const { req } = ctx
    const isServer = !!req
    let store = {}
    if (isServer) {
        store = initStoreSession({
            isServer,
            token: req.cookies.token
        })
        await store.getProfile()
    } else {
        store = initStoreSession({ isServer })
        store.getSessionStorage()
    }
    return store
}
