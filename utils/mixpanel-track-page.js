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
                // parse props is not needed because
                // we don't have any state beside mobx
                // return <Page {...this.props} />
                render() {
                    return <Page />
                }
            }
        )
    )
}
