/* eslint-disable react/display-name */
import React from 'react'
import {withRouter} from 'react-router-dom'
import {Button, ButtonGroup} from '@material-ui/core'

export default withRouter(({history, location}) => {
  const portfolioSelected = location.pathname === '/home/portfolio'
  return (
    <div id="nav-container">
      <ButtonGroup color="primary" variant="outlined">
        <Button
          variant={portfolioSelected ? 'contained' : 'outlined'}
          onClick={() => history.push('/home/portfolio')}
        >
          Portfolio
        </Button>
        <Button
          variant={portfolioSelected ? 'outlined' : 'contained'}
          onClick={() => history.push('/home/transactions')}
        >
          Transactions
        </Button>
      </ButtonGroup>
    </div>
  )
})
