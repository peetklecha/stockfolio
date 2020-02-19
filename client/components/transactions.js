/* eslint-disable react/display-name */
import React from 'react'
import {connect} from 'react-redux'
import PortfolioEntry from './portfolio-entry'
import {List} from '@material-ui/core'
import {TRANSACTIONS_LABEL} from './constants'
import {displayCpennies} from '../utils'

export default connect(state => ({
  purchaseHistory: state.history.transactions
}))(({purchaseHistory}) => (
  <div id="list-page">
    <h1>{TRANSACTIONS_LABEL}</h1>
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
