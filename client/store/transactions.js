import {
  GOT_TRANSACTIONS,
  GET_TRANSACTIONS_ERROR,
  ADDED_TO_HISTORY,
  REMOVE_USER,
  ADD_TO_HISTORY_ERROR
} from './constants'

const defaultTransactions = {
  getError: false,
  addError: false,
  transactions: []
}

export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return {...state, transactions: action.transactions}
    case GET_TRANSACTIONS_ERROR:
      return {...state, getError: true}
    case ADDED_TO_HISTORY:
      return {
        ...state,
        transactions: [...state.transactions, action.transaction]
      }
    case ADD_TO_HISTORY_ERROR:
      return {...state, addError: true}
    case REMOVE_USER:
      return defaultTransactions
    default:
      return state
  }
}
