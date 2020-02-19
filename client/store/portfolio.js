import {arrayReplace} from '../utils'
import {
  GOT_PORTFOLIO,
  GET_PORTFOLIO_ERROR,
  GOT_QUOTES,
  GET_QUOTES_ERROR,
  BOUGHT_STOCK,
  REMOVE_USER,
  BUY_STOCK_ERROR
} from './constants'

const defaultPortfolio = {
  loaded: false,
  portfolioError: false,
  quotesError: false,
  buyError: false,
  stocks: []
}

export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return {...state, stocks: action.portfolio, loaded: true}
    case GOT_QUOTES:
      return {
        ...state,
        stocks: state.stocks.map(stock => ({
          ...stock,
          latestPrice: action.quotes[stock.symbol].quote.latestPrice,
          latestTime: action.quotes[stock.symbol].quote.latestTime
        }))
      }
    case BOUGHT_STOCK:
      return {
        ...state,
        stocks: arrayReplace(state.stocks, action.stock, 'symbol')
      }
    case BUY_STOCK_ERROR:
      return {...state, buyError: true}
    case GET_PORTFOLIO_ERROR:
      return {...state, portfolioError: true}
    case GET_QUOTES_ERROR:
      return {...state, quotesError: true}
    case REMOVE_USER:
      return defaultPortfolio
    default:
      return state
  }
}
