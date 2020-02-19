import React from 'react'
import {connect} from 'react-redux'
import {List} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import PortfolioEntry from './portfolio-entry'
import {displayDollars, stockChange, portfolioHeader} from '../utils'

export default connect(state => ({
  portfolio: state.portfolio.stocks,
  portfolioError: state.portfolio.portfolioError,
  quotesError: state.portfolio.quotesError
}))(({portfolio, portfolioError, quotesError}) => (
  <div id="list-page">
    <h1>{portfolioHeader(portfolio)}</h1>
    {portfolioError && (
      <Alert severity="warning">
        Your portfolio has not loaded properly. Retrying...
      </Alert>
    )}
    {quotesError && (
      <Alert severity="warning">
        Price information is out of date. Retrying...
      </Alert>
    )}
    <List id="portfolio-container">
      {portfolio.map(stock => (
        <PortfolioEntry
          key={stock.symbol}
          symbol={stock.symbol}
          shares={stock.shares}
          status={stockChange(stock)}
          value={stock.latestPrice ? displayDollars(stock.latestPrice) : '...'}
        />
      ))}
    </List>
  </div>
))
