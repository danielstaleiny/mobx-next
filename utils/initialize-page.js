import React, { Component, Fragment } from 'react'
import initStoreSession from '~/store/session'
import initMixpanel from '~/store/mixpanel'
import injectSession from './inject-session'
import globalStyles from '~/components/global-styles'
import { Provider } from 'mobx-react'

// dev setup
// import DevTools from 'mobx-react-devtools'
// <DevTools />

export const initWithData = (
    { restricted = false, adminOnly = false } = {}
) => getData => Page => {
    return class PageComponent extends Component {
        static async getInitialProps(ctx) {
            const { req } = ctx
            const isServer = !!req
            const session = await injectSession(ctx)

            if (restricted && !session.isAuthed) {
                if (isServer) {
                    ctx.res.writeHead(307, { Location: '/signin' })
                    ctx.res.end()
                } else {
                    const Router = require('next/router')
                    Router.push('/signin')
                }
            }

            if (adminOnly && !session.profile.admin) {
                if (isServer) {
                    ctx.res.writeHead(307, { Location: '/' })
                    ctx.res.end()
                } else {
                    const Router = require('next/router')
                    Router.push('/')
                }
            }

            const mixpanel = initMixpanel()
            if (!isServer) mixpanel.init()
            const data = await getData(ctx)

            return { ...data, ...session, ...mixpanel, isServer }
        }

        session = initStoreSession(this.props)
        mixpanel = initMixpanel(this.props)

        componentDidMount() {
            this.session.setSessionStorage()
            if (!this.mixpanel.loaded) this.mixpanel.init()
        }

        render() {
            return (
                <Provider session={this.session} mixpanel={this.mixpanel}>
                    <Fragment>
                        <style jsx global>
                            {globalStyles}
                        </style>
                        <Page />
                    </Fragment>
                </Provider>
            )
        }
    }
}

export const restricted = initWithData({ restricted: true })(ctx => {
    return {}
})

export const restrictedWithData = initWithData({ restricted: true })

export const adminOnly = initWithData({
    restricted: true,
    adminOnly: true
})(ctx => {
    return {}
})

export const adminOnlyWithData = initWithData({
    restricted: true,
    adminOnly: true
})

const init = initWithData()(ctx => {
    return {}
})

export default init
