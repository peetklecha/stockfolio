/* eslint-disable react/display-name */
import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Button, ButtonGroup} from '@material-ui/core'
import {logout} from '../store/actions'
import {PORTFOLIO_LABEL, TRANSACTIONS_LABEL} from './constants'

export default withRouter(
  connect(null, dispatch => ({doLogout: () => dispatch(logout())}))(
    ({history, location, doLogout}) => {
      const portfolioSelected = location.pathname === '/home/portfolio'
      return (
        <div id="nav-container">
          <Button color="primary" variant="outlined" onClick={doLogout}>
            Logout
          </Button>
          <ButtonGroup color="primary" variant="outlined">
            <Button
              variant={portfolioSelected ? 'contained' : 'outlined'}
              onClick={() => history.push('/home/portfolio')}
            >
              {PORTFOLIO_LABEL}
            </Button>
            <Button
              variant={portfolioSelected ? 'outlined' : 'contained'}
              onClick={() => history.push('/home/transactions')}
            >
              {TRANSACTIONS_LABEL}
            </Button>
          </ButtonGroup>
        </div>
      )
    }
  )
)
