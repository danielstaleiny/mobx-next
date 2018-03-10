import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'

export default ({ event = 'page', json } = {}) => Page => {
    return inject('mixpanel')(
        observer(
            class MixWrapper extends Component {
                componentDidMount() {
                    if (this.props.mixpanel.loaded)
                        this.props.mixpanel.track(event, json)
                }
                render() {
                    return (
                        <Page
                            data={this.props.data}
                            isServer={this.props.isServer}
                        />
                    )
                }
            }
        )
    )
}
