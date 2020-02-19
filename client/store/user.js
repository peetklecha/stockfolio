import {GET_USER, REMOVE_USER, BOUGHT_STOCK, LOGOUT_ERROR} from './constants'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case LOGOUT_ERROR:
      return {...state, error: action.error}
    case REMOVE_USER:
      return {checkedForUser: true}
    case BOUGHT_STOCK:
      return {...state, cash: +action.cashRemaining}
    default:
      return state
  }
}
