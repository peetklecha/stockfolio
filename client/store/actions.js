import axios from 'axios'
import {IEX_API_KEY} from '../../secrets'
import {centipennies} from '../utils'
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
  ADD_TO_HISTORY_ERROR
} from './constants'

const api = symbol =>
  `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_API_KEY}`

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const gotPortfolio = portfolio => ({type: GOT_PORTFOLIO, portfolio})
const getPortfolioError = () => ({type: GET_PORTFOLIO_ERROR})
const gotQuotes = quotes => ({type: GOT_QUOTES, quotes})
const getQuotesError = () => ({type: GET_QUOTES_ERROR})
const addedToHistory = transaction => ({type: ADDED_TO_HISTORY, transaction})
const gotTransactions = transactions => ({type: GOT_TRANSACTIONS, transactions})
const getTransactionsError = () => ({type: GET_TRANSACTIONS_ERROR})
const buyStockError = () => ({type: BUY_STOCK_ERROR})
const addToHistoryError = () => ({type: ADD_TO_HISTORY_ERROR})
const boughtStock = (stock, qty, cashRemaining) => ({
  type: BOUGHT_STOCK,
  stock,
  qty,
  cashRemaining
})

export const buyStock = (symbol, qty) => async (dispatch, getState) => {
  let res, price
  const {id} = getState().user
  try {
    const quote = await axios.get(api(symbol))
    price = centipennies(quote.data.latestPrice)
  } catch (error) {
    dispatch(getQuotesError())
  }
  if (price) {
    try {
      res = await axios.post(`/api/users/${id}/portfolio/`, {
        symbol,
        qty,
        price
      })
      if (res) dispatch(boughtStock(res.data.stock, qty, res.data.user.cash))
    } catch (error) {
      dispatch(buyStockError())
    }
    if (res) {
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
    const quotesArray = await Promise.all(
      symbols.map(symbol => axios.get(api(symbol)))
    )
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

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || {checkedForUser: true}))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, name) => async dispatch => {
  let res
  try {
    console.log('starting thunk')
    res = await axios.post(`/auth/${method}`, {email, password, name})
  } catch (authError) {
    console.log('erroring in thunk')
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}
