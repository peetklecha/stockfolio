import axios from 'axios'
import {IEX_API_KEY} from '../../secrets'

const api = symbol =>
  `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_API_KEY}`
/**
 * ACTION TYPES
 */
const GOT_PORTFOLIO = 'GOT_PORTFOLIO'
const GET_PORTFOLIO_ERROR = 'GET_PORTFOLIO_ERROR'
const GOT_QUOTES = 'GOT_QUOTES'
const GET_QUOTES_ERROR = 'GOT_QUOTES_ERROR'

/**
 * INITIAL STATE
 */
const defaultPortfolio = {
  loaded: false,
  portfolioError: false,
  quotesError: false,
  stocks: []
}

/**
 * ACTION CREATORS
 */
const gotPortfolio = portfolio => ({type: GOT_PORTFOLIO, portfolio})
export const getPortfolioError = () => ({type: GET_PORTFOLIO_ERROR})
const gotQuotes = quotes => ({type: GOT_QUOTES, quotes})
export const getQuotesError = () => ({type: GET_QUOTES_ERROR})

/**
 * THUNK CREATORS
 */
export const getPortfolio = () => async (dispatch, getState) => {
  try {
    const {id} = getState().user
    const res = await axios.get(`/api/users/${id}/portfolio`)
    dispatch(gotPortfolio(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getQuotes = () => async (dispatch, getState) => {
  try {
    const symbols = getState().portfolio.stocks.map(stock => stock.ticker)
    const promises = symbols.map(symbol => axios.get(api(symbol)))
    const quotesArray = await Promise.all(promises)
    const quotesObj = quotesArray.reduce((obj, quote) => {
      console.log(obj)
      console.log(quote.data.symbol)
      obj[quote.data.symbol] = quote.data
      return obj
    }, {})
    console.log(quotesObj)
    dispatch(gotQuotes(quotesObj))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return {...state, stocks: action.portfolio, loaded: true}
    case GOT_QUOTES:
      console.log(state)
      console.log(action)
      return {
        ...state,
        stocks: state.stocks.map(stock => ({
          ...stock,
          latestPrice: action.quotes[stock.ticker].latestPrice,
          latestTime: action.quotes[stock.ticker].latestTime
        }))
      }
    case GET_PORTFOLIO_ERROR:
      return {...state, portfolioError: true}
    case GET_QUOTES_ERROR:
      return {...state, quotesError: true}
    default:
      return state
  }
}
