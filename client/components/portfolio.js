import React from 'react'
import {connect} from 'react-redux'
import {List} from '@material-ui/core'
import PortfolioEntry from './portfolio-entry'
import {displayDollars, stockChange, portfolioHeader} from '../utils'

export default connect(state => ({
  portfolio: state.portfolio.stocks
}))(({portfolio}) => (
  <div id="list-page">
    <h1>{portfolioHeader(portfolio)}</h1>
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
