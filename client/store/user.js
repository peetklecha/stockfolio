import {GET_USER, REMOVE_USER, BOUGHT_STOCK} from './constants'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return {checkedForUser: true}
    case BOUGHT_STOCK:
      return {...state, cash: +action.cashRemaining}
    default:
      return state
  }
}
