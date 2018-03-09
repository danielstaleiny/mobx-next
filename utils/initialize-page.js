import React, { Component, Fragment } from 'react'
import initStoreSession from '~/store/session'
import initMixpanel from '~/store/mixpanel'
import injectSession from './inject-session'
import globalStyles from '~/components/global-styles'
import { Provider } from 'mobx-react'

// dev setup
// import DevTools from 'mobx-react-devtools'
// <DevTools />

export default function initializePage(Page) {
    return class PageComponent extends Component {
        static async getInitialProps(ctx) {
            const { req } = ctx
            const isServer = !!req
            const session = await injectSession(ctx)
            const mixpanel = initMixpanel()
            if (!isServer) mixpanel.init()
            return { ...session, ...mixpanel, isServer }
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
