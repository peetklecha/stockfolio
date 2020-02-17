import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_PORTFOLIO = 'GOT_PORTFOLIO'
const GET_PORTFOLIO_ERROR = 'GET_PORTFOLIO_ERROR'

/**
 * INITIAL STATE
 */
const defaultPortfolio = {
  error: false,
  stocks: []
}

/**
 * ACTION CREATORS
 */
const gotPortfolio = portfolio => ({type: GOT_PORTFOLIO, portfolio})
export const getPortfolioError = () => ({type: GET_PORTFOLIO_ERROR})

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

/**
 * REDUCER
 */
export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GOT_PORTFOLIO:
      return {...state, stocks: action.portfolio}
    case GET_PORTFOLIO_ERROR:
      return {...state, error: true}
    default:
      return state
  }
}
