import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Login, Signup, UserHome} from './components'
import {me} from './store'

export default withRouter(
  connect(
    state => ({isLoggedIn: !!state.user.id}),
    dispatch => ({loadInitialData: () => dispatch(me())})
  )(
    class App extends Component {
      componentDidMount() {
        this.props.loadInitialData()
      }

      render() {
        const {isLoggedIn} = this.props

        return (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {isLoggedIn && (
              <Switch>
                <Route path="/home" component={UserHome} />
                <Redirect to="home/portfolio" />
              </Switch>
            )}
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        )
      }
    }
  )
)
