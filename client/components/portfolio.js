import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List} from '@material-ui/core'
import PortfolioEntry from './portfolio-entry'
import {getPortfolio} from '../store/portfolio'

export default connect(
  state => ({
    cash: state.user.cash,
    email: state.user.email,
    name: state.user.name,
    portfolio: state.portfolio.stocks,
    portfolioError: state.portfolio.error
  }),
  dispatch => ({
    getPortfolio: () => dispatch(getPortfolio())
  })
)(
  class Portfolio extends Component {
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

    componentDidMount() {
      if (!this.props.portfolio.length) this.props.getPortfolio()
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

    render() {
      return (
        <div id="list-page">
          <h1>{`Portfolio ($${this.getPortfolioValue()})`}</h1>
          <List id="portfolio-container">
            {this.props.portfolio.map(stock => (
              <PortfolioEntry
                key={stock.ticker}
                ticker={stock.ticker}
                shares={stock.shares}
                value={Number.parseFloat(
                  this.state.stockValues[stock.ticker]
                ).toFixed(2)}
              />
            ))}
          </List>
        </div>
      )
    }
  }
)
