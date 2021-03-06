import React from 'react'
import {connect} from 'react-redux'
import ErrorMessage from './error-message'
import {clearBuyStockError} from '../store/actions'

export default connect(
  state => ({
    portfolioError: state.portfolio.portfolioError,
    quotesError: state.portfolio.quotesError,
    buyError: state.portfolio.buyError,
    transAddError: state.history.addError,
    transGetError: state.history.getError,
    userError: state.user.error
  }),
  dispatch => ({
    clearBuyError: () => dispatch(clearBuyStockError())
  })
)(props => {
  return (
    <div>
      <ErrorMessage flag={props.portfolioError}>
        There was an error while retrieving your portfolio.
      </ErrorMessage>
      <ErrorMessage flag={!!props.quotesError}>
        There was an error while retrieving your quotes. Information is not up
        to date.
      </ErrorMessage>
      <ErrorMessage flag={!!props.buyError} onClose={props.clearBuyError}>
        {'There was an error processing your purchase. ' +
          (props.buyError.data || 'Contact us for more information.')}
      </ErrorMessage>
      <ErrorMessage flag={props.transAddError}>
        Your purchase has gone through, but is not reflected in your transaction
        history.
      </ErrorMessage>
      <ErrorMessage flag={props.transGetError}>
        There was an error while retrieving your transaction history.
      </ErrorMessage>
      <ErrorMessage flag={!!props.userError}>
        {`There was an authentication problem${props.userError &&
          props.userError.response &&
          ': ' + props.userError.response.data}`}
      </ErrorMessage>
    </div>
  )
})
