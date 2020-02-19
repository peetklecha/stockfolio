import React from 'react'
import {connect} from 'react-redux'
import ErrorMessage from './error-message'

export default connect(state => ({
  portfolioError: state.portfolio.portfolioError,
  quotesError: state.portfolio.quotesError,
  buyError: state.portfolio.buyError,
  transAddError: state.history.addError,
  transGetError: state.history.getError
}))(props => {
  return (
    <div>
      <ErrorMessage flag={props.portfolioError}>
        There was an error while retrieving your portfolio.
      </ErrorMessage>
      <ErrorMessage flag={props.quotesError}>
        There was an error while retrieving your quotes. Information is not up
        to date.
      </ErrorMessage>
      <ErrorMessage flag={props.buyError}>
        There was an error processing your purchase. Contact us for more
        information.
      </ErrorMessage>
      <ErrorMessage flag={props.buyError}>
        There was an error processing your purchase. Contact us for more
        information.
      </ErrorMessage>
      <ErrorMessage flag={props.transAddError}>
        Your purchase has gone through, but is not reflected in your transaction
        history.
      </ErrorMessage>
      <ErrorMessage flag={props.transGetError}>
        There was an error while retrieving your transaction history.
      </ErrorMessage>
    </div>
  )
})
