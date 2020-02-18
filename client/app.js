import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, Signup, UserHome} from './components'
import {me} from './store'

export default withRouter(
  connect(
    state => ({isLoggedIn: !!state.user.id}),
    dispatch => ({loadInitialData: () => dispatch(me())})
  )(
    class App extends Component {
      constructor() {
        super()
        this.state = {
          loaded: false
        }
      }

      componentDidMount() {
        this.props.loadInitialData()
      }

      componentDidUpdate() {
        if (!this.state.loaded) this.setState({loaded: true})
      }

      render() {
        const {isLoggedIn} = this.props
        if (!this.state.loaded) return ''
        return (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {isLoggedIn && <Route component={UserHome} />}
            <Route component={Login} />
          </Switch>
        )
      }
    }
  )
)
