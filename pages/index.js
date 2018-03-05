import React, { Component, PropTypes } from 'react'
import { Provider } from 'mobx-react'
import initStore from '~/store'

function initializePage(UI) {
    return class PageComponent extends Component {
        static getInitialProps({ req }) {
            const isServer = !!req
            const store = initStore(isServer)
            return { helloMessage: store.helloMessage, isServer }
        }

        constructor(props) {
            super(props)
            this.store = initStore(props.isServer, props.helloMessage)
        }

        render() {
            return (
                <Provider store={this.store}>
                    <div>
                        <style jsx global>{`
                            body {
                                margin: 0;
                                padding: 0;
                            }
                        `}</style>
                        <UI />
                    </div>
                </Provider>
            )
        }
    }
}

import { observer, inject } from 'mobx-react'

@inject('store')
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
