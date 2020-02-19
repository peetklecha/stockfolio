import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, Signup, UserHome} from './components'
import MessageCenter from './components/message-center'
import {me} from './store/actions'

export default withRouter(
  connect(
    state => ({
      isLoggedIn: !!state.user.id,
      checkedForUser: state.user.checkedForUser,
      error: !!state.user.error
    }),
    dispatch => ({loadInitialData: () => dispatch(me())})
  )(
    class App extends Component {
      componentDidMount() {
        this.props.loadInitialData()
      }

      render() {
        const {isLoggedIn, checkedForUser, error} = this.props
        if (!isLoggedIn && !checkedForUser && !error) return ''
        return (
          <div>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              {isLoggedIn && <Route component={UserHome} />}
              <Route component={Login} />
            </Switch>
            <MessageCenter />
          </div>
        )
      }
    }
  )
)
