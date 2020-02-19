/* eslint-disable react/display-name */
import React from 'react'
import {connect} from 'react-redux'
import {Alert} from '@material-ui/lab'
import {List} from '@material-ui/core'
import PortfolioEntry from './portfolio-entry'
import {TRANSACTIONS_LABEL} from './constants'
import {displayCpennies} from '../utils'

export default connect(state => ({
  purchaseHistory: state.history.transactions,
  transAddError: state.history.addError,
  transGetError: state.history.getError
}))(({purchaseHistory, transAddError, transGetError}) => (
  <div id="list-page">
    <h1>{TRANSACTIONS_LABEL}</h1>
    {transAddError && (
      <Alert severity="warning">
        At least one transaction has not been recorded in your history.
      </Alert>
    )}
    {transGetError && (
      <Alert severity="warning">
        Your transactions have not been properly loaded. Retrying ...
      </Alert>
    )}
    <div id="transaction-main">
      <List id="transaction-container">
        {purchaseHistory.map(transaction => (
          <PortfolioEntry
            key={transaction.symbol + transaction.createdAt}
            symbol={transaction.symbol}
            shares={transaction.shares}
            value={displayCpennies(transaction.price)}
          />
        ))}
      </List>
    </div>
  </div>
))
