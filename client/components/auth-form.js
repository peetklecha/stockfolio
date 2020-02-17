import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {SIGNIN_BUTTON, SIGNUP_BUTTON} from './constants'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="form-page">
      <h1>StockFolio</h1>
      <div id="form-container">
        <h2>{displayName}</h2>
        <form onSubmit={handleSubmit} name={name} id="entry-form">
          {displayName === SIGNUP_BUTTON && (
            <TextField
              id="name-field"
              name="userName"
              label="Name"
              variant="outlined"
            />
          )}
          <TextField
            id="email-field"
            name="email"
            label="Email"
            variant="outlined"
          />
          <TextField
            id="password-field"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
          />
          <div id="button-container">
            <Button variant="contained" color="primary" type="submit">
              {displayName}
            </Button>
            {displayName === SIGNIN_BUTTON && (
              <Link to="/signup">
                <Button variant="contained">{SIGNUP_BUTTON}</Button>
              </Link>
            )}
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: SIGNIN_BUTTON,
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: SIGNUP_BUTTON,
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const name = evt.target.userName && evt.target.userName.value
      dispatch(auth(email, password, formName, name))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

//
//
//<div>
//<label htmlFor="email">
//<small>Email</small>
//</label>
//<input name="email" type="text" />
//</div>
