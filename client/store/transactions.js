import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_TRANSACTIONS = 'GOT_TRANSACTIONS'
const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR'

/**
 * INITIAL STATE
 */
const defaultTransactions = {
  error: false,
  transactions: []
}

/**
 * ACTION CREATORS
 */
const gotTransactions = transactions => ({type: GOT_TRANSACTIONS, transactions})
export const getTransactionsError = () => ({type: GET_TRANSACTIONS_ERROR})

/**
 * THUNK CREATORS
 */
export const getTransactions = () => async (dispatch, getState) => {
  try {
    console.log('in the thunk')
    const {id} = getState().user
    const res = await axios.get(`/api/users/${id}/history`)
    console.log('on the way out')
    dispatch(gotTransactions(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return {...state, transactions: action.transactions}
    case GET_TRANSACTIONS_ERROR:
      return {...state, error: true}
    default:
      return state
  }
}
