import React, { Component, Fragment } from 'react'
import { Provider } from 'mobx-react'
import initStore from '~/store'

function initializePage(UI) {
    return class PageComponent extends Component {
        static getInitialProps(ctx) {
            console.log(ctx.query)
            const { req } = ctx
            const isServer = !!req
            const store = initStore(isServer)
            return { helloMessage: store.helloMessage, isServer }
        }

        store = initStore(this.props.isServer, this.props.helloMessage)

        store2 = initStore(this.props.isServer, this.props.helloMessage)

        render() {
            return (
                <Provider store={this.store} store2={this.store2}>
                    <Fragment>
                        <style jsx global>{`
                            body {
                                margin: 0;
                                padding: 0;
                            }
                        `}</style>
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
class Content extends Component {
    componentDidMount() {
        this.props.store.helloMessage = 'hello from other side'
    }

    render() {
        return (
            <div className="friendlyHello">
                <style jsx>{`
                    .friendlyHello {
                        color: blue;
                    }
                `}</style>
                {this.props.store.helloMessage}
                {console.log(this.props)}
            </div>
        )
    }
}

export default initializePage(Content)
