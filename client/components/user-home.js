import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import {TextField, Button} from '@material-ui/core'
import Portfolio from './portfolio'
import Transactions from './transactions'

export default connect(state => ({
  cash: state.user.cash,
  email: state.user.email,
  name: state.user.name,
  portfolio: state.portfolio.stocks,
  portfolioError: state.portfolio.error
}))(
  class UserHome extends Component {
    constructor(props) {
      super(props)
      this.state = {
        stockValues: {
          AAPL: '300.0000',
          STWD: '20.5613',
          NFLX: '47.4747'
        }
      }
    }

    getPortfolioValue() {
      if (!this.props.portfolio.length) return '0.00'
      return this.props.portfolio
        .map(
          stock =>
            stock.shares *
            Number.parseFloat(this.state.stockValues[stock.ticker])
        )
        .reduce((x, y) => x + y)
        .toFixed(2)
        .toString()
    }

    handleSubmit() {}

    render() {
      return (
        <div id="portfolio-page">
          <Route path="/home/portfolio" component={Portfolio} />
          <Route path="/home/transactions" component={Transactions} />
          <div id="console">
            <h3>{`Cash - $${(this.props.cash / 10000).toFixed(2)}`}</h3>
            <form
              onSubmit={this.handleSubmit.bind(this)}
              name="buy"
              id="buy-form"
            >
              <TextField
                id="ticker-field"
                name="ticker"
                label="Ticker"
                variant="outlined"
              />
              <TextField
                id="qty-field"
                name="qty"
                label="Qty"
                variant="outlined"
              />
              <Button variant="contained" color="primary" type="submit">
                Buy
              </Button>
            </form>
          </div>
        </div>
      )
    }
  }
)
