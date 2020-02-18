import {
  GOT_TRANSACTIONS,
  GET_TRANSACTIONS_ERROR,
  ADDED_TO_HISTORY,
  REMOVE_USER
} from './constants'

const defaultTransactions = {
  error: false,
  transactions: []
}

export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return {...state, transactions: action.transactions}
    case GET_TRANSACTIONS_ERROR:
      return {...state, error: true}
    case ADDED_TO_HISTORY:
      return {
        ...state,
        transaction: [...state.transactions, action.transaction]
      }
    case REMOVE_USER:
      return defaultTransactions
    default:
      return state
  }
}
