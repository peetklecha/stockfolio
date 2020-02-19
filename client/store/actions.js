import axios from 'axios'
import {IEX_API_KEY} from '../../secrets'
import {centipennies, dollars} from '../utils'
import {
  GOT_PORTFOLIO,
  GET_QUOTES_ERROR,
  GET_PORTFOLIO_ERROR,
  GOT_QUOTES,
  BOUGHT_STOCK,
  ADDED_TO_HISTORY,
  GOT_TRANSACTIONS,
  GET_TRANSACTIONS_ERROR,
  GET_USER,
  REMOVE_USER,
  BUY_STOCK_ERROR,
  ADD_TO_HISTORY_ERROR,
  LOGOUT_ERROR
} from './constants'

const singleApi = symbol =>
  `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_API_KEY}`

const batchApi = symbols =>
  `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols.join(
    ','
  )}&types=quote&token=${IEX_API_KEY}`

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const gotPortfolio = portfolio => ({type: GOT_PORTFOLIO, portfolio})
const getPortfolioError = () => ({type: GET_PORTFOLIO_ERROR})
const gotQuotes = quotes => ({type: GOT_QUOTES, quotes})
const getQuotesError = error => ({type: GET_QUOTES_ERROR, error})
const addedToHistory = transaction => ({type: ADDED_TO_HISTORY, transaction})
const gotTransactions = transactions => ({type: GOT_TRANSACTIONS, transactions})
const getTransactionsError = () => ({type: GET_TRANSACTIONS_ERROR})
export const buyStockError = (error = '') => ({type: BUY_STOCK_ERROR, error})
const addToHistoryError = () => ({type: ADD_TO_HISTORY_ERROR})
const logoutError = error => ({type: LOGOUT_ERROR, error})
const boughtStock = (stock, qty, cashRemaining) => ({
  type: BOUGHT_STOCK,
  stock,
  qty,
  cashRemaining
})

export const buyStock = (symbol, qty) => async (dispatch, getState) => {
  let res, price, quote, quit
  const {id} = getState().user
  try {
    quote = await axios.get(singleApi(symbol))
    price = centipennies(quote.data.latestPrice)
  } catch (error) {
    dispatch(getQuotesError(error.response))
    quit = true
  }
  if (quit) return
  const buy = {symbol, qty, price}
  try {
    res = await axios.post(`/api/users/${id}/portfolio/`, buy)
    const finalStock = res.data.stock
    finalStock.latestPrice = dollars(price)
    finalStock.latestTime = quote.data.latestTime
    finalStock.open = quote.data.open
    const cash = +res.data.user.cash
    dispatch(boughtStock(finalStock, qty, cash))
  } catch (error) {
    dispatch(buyStockError())
    quit = true
  }
  if (quit) return
  try {
    const newRes = await axios.post(`/api/users/${id}/history`, buy)
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
    const quotesObj = await axios.get(batchApi(symbols))
    dispatch(gotQuotes(quotesObj.data))
  } catch (err) {
    dispatch(getQuotesError())
  }
}

export const getTransactions = () => async (dispatch, getState) => {
  try {
    const {id} = getState().user
    const res = await axios.get(`/api/users/${id}/history`)
    dispatch(gotTransactions(res.data))
  } catch (err) {
    dispatch(getTransactionsError())
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || {checkedForUser: true}))
  } catch (err) {
    dispatch(getUser({error: err}))
  }
}

export const auth = (email, password, method, name) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password, name})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    dispatch(getUser({error: dispatchOrHistoryErr}))
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
  } catch (err) {
    dispatch(logoutError({error: err}))
  }
}
