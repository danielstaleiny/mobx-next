import React, { Component, Fragment } from 'react'
import { Provider } from 'mobx-react'
import initStore from '~/store'

function initializePage(UI) {
    return class PageComponent extends Component {
        static getInitialProps({ req }) {
            const isServer = !!req
            const store = initStore({ isServer: isServer })
            return { message: store.helloMessage, isServer }
        }

        store = initStore(this.props)
        store2 = initStore(this.props)

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
