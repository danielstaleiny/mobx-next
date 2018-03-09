import React, { Component, Fragment } from 'react'
import { Provider } from 'mobx-react'
import initStore from '~/store'

import Content from '~/components/content'

import globalStyles from '~/components/global-styles'

function initializePage(UI) {
    return class PageComponent extends Component {
        static getInitialProps(ctx) {
            const { req } = ctx
            const isServer = !!req
            const store = initStore({ isServer })
            return { helloMessage: store.helloMessage, isServer }
        }

        store = initStore({
            isServer: this.props.isServer,
            message: this.props.helloMessage
        })

        store2 = initStore({ ...this.props, message: this.props.helloMessage })

        render() {
            return (
                <Provider store={this.store} store2={this.store2}>
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

@inject('store')
@inject('store2')
@observer
class Page extends Component {
    componentDidMount() {
        this.props.store.helloMessage = 'hello from other side'
    }

    render() {
        return (
            <main className="friendlyHello">
                <Content />
            </main>
        )
    }
}

export default initializePage(Page)
