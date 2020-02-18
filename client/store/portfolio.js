import {arrayReplace} from '../utils'
import {
  GOT_PORTFOLIO,
  GET_PORTFOLIO_ERROR,
  GOT_QUOTES,
  GET_QUOTES_ERROR,
  BOUGHT_STOCK,
  REMOVE_USER
} from './constants'

const defaultPortfolio = {
  loaded: false,
  portfolioError: false,
  quotesError: false,
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
          latestPrice: action.quotes[stock.symbol].latestPrice,
          latestTime: action.quotes[stock.symbol].latestTime
        }))
      }
    case BOUGHT_STOCK:
      return {
        ...state,
        stocks: arrayReplace(state.stocks, action.stock, 'symbol')
      }
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
