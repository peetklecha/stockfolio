import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List} from '@material-ui/core'
import PortfolioEntry from './portfolio-entry'
import {getPortfolio} from '../store/actions'

export default connect(
  state => ({
    cash: state.user.cash,
    email: state.user.email,
    name: state.user.name,
    portfolio: state.portfolio.stocks,
    portfolioLoaded: state.portfolio.loaded
  }),
  dispatch => ({
    getPortfolio: () => dispatch(getPortfolio())
  })
)(
  class Portfolio extends Component {
    getPortfolioValue() {
      if (!this.props.portfolio.length) return '0.00'
      const stocksWithQuotes = this.props.portfolio.filter(
        stock => stock.latestPrice
      )
      const tail =
        stocksWithQuotes.length < this.props.portfolio.length ? '...' : ''
      return (
        stocksWithQuotes
          .map(stock => stock.shares * Number.parseFloat(stock.latestPrice))
          .reduce((x, y) => x + y, 0)
          .toFixed(2)
          .toString() + tail
      )
    }

    render() {
      return (
        <div id="list-page">
          <h1>{`Portfolio ($${this.getPortfolioValue()})`}</h1>
          <List id="portfolio-container">
            {this.props.portfolio.map(stock => (
              <PortfolioEntry
                key={stock.symbol}
                symbol={stock.symbol}
                shares={stock.shares}
                value={
                  stock.latestPrice
                    ? Number.parseFloat(stock.latestPrice).toFixed(2)
                    : '...'
                }
              />
            ))}
          </List>
        </div>
      )
    }
  }
)
