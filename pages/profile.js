import React, { Component, Fragment } from 'react'
import { Provider } from 'mobx-react'
import initStoreSession from '~/store/session'

import Content from '~/components/content'

import globalStyles from '~/components/global-styles'
// dev setup
// import DevTools from 'mobx-react-devtools'
// <DevTools />

function initializePage(UI) {
    return class PageComponent extends Component {
        static async getInitialProps(ctx) {
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
            return { ...store, isServer }
        }

        store = initStoreSession(this.props)

        componentDidMount() {
            this.store.setSessionStorage()
        }

        render() {
            return (
                <Provider store={this.store}>
                    <Fragment>
                        <style jsx global>
                            {globalStyles}
                        </style>
                        <UI />
                    </Fragment>
                </Provider>
            )
        }
    }
}

import { observer, inject } from 'mobx-react'

// <Content />
@inject('store')
@observer
class Page extends Component {
    render() {
        return <main className="friendlyHello">{this.props.store.token}</main>
    }
}

export default initializePage(Page)
