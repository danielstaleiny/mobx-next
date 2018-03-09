import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import init from '~/utils/initialize-page'

import Content from '~/components/content'

@inject('session')
@observer
class Page extends Component {
    render() {
        return <main className="friendlyHello">{this.props.session.token}</main>
    }
}

export default init(Page)
