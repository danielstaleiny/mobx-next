import React, { Component, Fragment } from 'react'
import { Provider, observer, inject } from 'mobx-react'
import { initWithData } from '~/utils/initialize-page'

import Content from '~/components/content'

// provider to pass additional data

class Page extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        return (
            <main className="friendlyHello">
                {this.props.isServer.toString()}
            </main>
        )
    }
}

export default initWithData(ctx => {
    return { name: 'daniel' }
})(Page)
