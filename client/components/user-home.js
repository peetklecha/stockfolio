import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import {TextField, Button} from '@material-ui/core'
import Portfolio from './portfolio'
import Transactions from './transactions'
import NavBar from './navbar'
import MessageCenter from './message-center'
import {
  getPortfolio,
  getQuotes,
  buyStock,
  getTransactions
} from '../store/actions'

export default connect(
  state => ({
    cash: state.user.cash,
    name: state.user.name,
    portfolio: state.portfolio.stocks,
    portfolioLoaded: state.portfolio.loaded
  }),
  dispatch => ({
    getPortfolio: () => dispatch(getPortfolio()),
    getQuotes: () => dispatch(getQuotes()),
    buyStock: (symbol, qty) => dispatch(buyStock(symbol, qty)),
    getTransactions: () => dispatch(getTransactions())
  })
)(
  class UserHome extends Component {
    componentDidMount() {
      this.props.history.push('/home/portfolio')
      this.props.getPortfolio()
      this.props.getTransactions()
    }

    componentDidUpdate(prevProps) {
      if (!prevProps.portfolioLoaded && this.props.portfolioLoaded) {
        this.props.getQuotes()
        this.setIntervalId = setInterval(() => this.props.getQuotes(), 60000)
      }
    }

    componentWillUnmount() {
      clearInterval(this.setIntervalId)
    }

    handleSubmit(evt) {
      evt.preventDefault()
      const symbol = evt.target.symbol.value
      const qty = evt.target.qty.value
      this.props.buyStock(symbol, qty)
    }

    render() {
      console.log('RENDERING')
      const showConsole = this.props.location.pathname === '/home/portfolio'
      return (
        <div id="home-page">
          <NavBar />
          <div id="main-container">
            <Route path="/home/portfolio" component={Portfolio} />
            <Route path="/home/transactions" component={Transactions} />
            <div className={showConsole ? 'console' : 'console hide'}>
              <h3>{`Cash - $${(this.props.cash / 10000).toFixed(2)}`}</h3>
              <form
                onSubmit={this.handleSubmit.bind(this)}
                name="buy"
                id="buy-form"
              >
                <TextField
                  id="symbol-field"
                  name="symbol"
                  label="Symbol"
                  variant="outlined"
                />
                <TextField
                  id="qty-field"
                  name="qty"
                  label="Qty"
                  variant="outlined"
                />
                <Button variant="contained" color="primary" type="submit">
                  Buy
                </Button>
              </form>
            </div>
          </div>
          <MessageCenter />
        </div>
      )
    }
  }
)
