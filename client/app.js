import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
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
                {/* Routes placed here are only available after logging in */}
                <Route path="/home" component={UserHome} />
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

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
