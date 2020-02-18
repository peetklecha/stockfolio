import axios from 'axios'
import {IEX_API_KEY} from '../../secrets'
import {
  GOT_PORTFOLIO,
  GET_QUOTES_ERROR,
  GET_PORTFOLIO_ERROR,
  GOT_QUOTES,
  BOUGHT_STOCK,
  ADDED_TO_HISTORY,
  GOT_TRANSACTIONS,
  GET_TRANSACTIONS_ERROR
} from './constants'

const api = symbol =>
  `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_API_KEY}`

const gotPortfolio = portfolio => ({type: GOT_PORTFOLIO, portfolio})
const getPortfolioError = () => ({type: GET_PORTFOLIO_ERROR})
const gotQuotes = quotes => ({type: GOT_QUOTES, quotes})
const getQuotesError = () => ({type: GET_QUOTES_ERROR})
const boughtStock = (stock, qty) => ({type: BOUGHT_STOCK, stock, qty})
const addedToHistory = transaction => ({type: ADDED_TO_HISTORY, transaction})
const gotTransactions = transactions => ({type: GOT_TRANSACTIONS, transactions})
const getTransactionsError = () => ({type: GET_TRANSACTIONS_ERROR})

export const buyStock = (symbol, qty, price) => async (dispatch, getState) => {
  let res
  const {id} = getState().user
  try {
    res = await axios.post(`/api/users/${id}/portfolio/`, {symbol, qty})
    if (res) dispatch(boughtStock(res.data, qty))
  } catch (error) {
    dispatch(buyStockError())
  }
  if (res)
    try {
      const newRes = await axios.post(`/api/users/${id}/history`, {
        symbol,
        qty,
        price
      })
      if (newRes) dispatch(addedToHistory(newRes.data))
    } catch (error) {
      dispatch(addToHistoryError())
    }
}

export const getPortfolio = () => async (dispatch, getState) => {
  try {
    const {id} = getState().user
    const res = await axios.get(`/api/users/${id}/portfolio`)
    dispatch(gotPortfolio(res.data))
  } catch (err) {
    dispatch(getPortfolioError())
  }
}

export const getQuotes = () => async (dispatch, getState) => {
  try {
    const symbols = getState().portfolio.stocks.map(stock => stock.symbol)
    const promises = symbols.map(symbol => axios.get(api(symbol)))
    const quotesArray = await Promise.all(promises)
    const quotesObj = quotesArray.reduce((obj, quote) => {
      obj[quote.data.symbol] = quote.data
      return obj
    }, {})
    dispatch(gotQuotes(quotesObj))
  } catch (err) {
    dispatch(getQuotesError())
  }
}

export const getTransactions = () => async (dispatch, getState) => {
  try {
    console.log('in the thunk')
    const {id} = getState().user
    const res = await axios.get(`/api/users/${id}/history`)
    console.log('on the way out')
    dispatch(gotTransactions(res.data))
  } catch (err) {
    dispatch(getTransactionsError())
  }
}
