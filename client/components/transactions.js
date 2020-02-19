/* eslint-disable react/display-name */
import React from 'react'
import {connect} from 'react-redux'
import PortfolioEntry from './portfolio-entry'
import {List} from '@material-ui/core'

export default connect(state => ({
  purchaseHistory: state.history
}))(
  class Transactions extends React.Component {
    // componentDidMount() {
    //   if (!this.props.purchaseHistory.transactions.length)
    //     this.props.getTransactions()
    // }

    render() {
      return (
        <div id="list-page">
          <h1>Transactions</h1>
          <div id="transaction-main">
            <List id="transaction-container">
              {this.props.purchaseHistory.transactions.map(transaction => (
                <PortfolioEntry
                  key={transaction.symbol + transaction.createdAt}
                  symbol={transaction.symbol}
                  shares={transaction.shares}
                  value={(transaction.price / 10000).toFixed(2)}
                />
              ))}
            </List>
          </div>
        </div>
      )
    }
  }
)
