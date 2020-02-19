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
import {SYMBOL_FIELD, QTY_FIELD, BUY_BUTTON} from './constants'
import {cashHeader} from '../utils'

export default connect(
  state => ({
    cash: state.user.cash,
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
    constructor(props) {
      super(props)
      this.state = {
        symbol: '',
        qty: ''
      }
    }

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
      this.setState({symbol: '', qty: ''})
    }

    handleChange(evt) {
      this.setState({[evt.target.name]: evt.target.value})
    }

    render() {
      const showConsole = this.props.location.pathname === '/home/portfolio'
      return (
        <div id="home-page">
          <NavBar />
          <div id="main-container">
            <Route path="/home/portfolio" component={Portfolio} />
            <Route path="/home/transactions" component={Transactions} />
            <div className={showConsole ? 'console' : 'console hide'}>
              <h3>{cashHeader(this.props.cash)}</h3>
              <form
                onSubmit={this.handleSubmit.bind(this)}
                name="buy"
                id="buy-form"
              >
                <TextField
                  id="symbol-field"
                  name="symbol"
                  label={SYMBOL_FIELD}
                  variant="outlined"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.symbol}
                />
                <TextField
                  id="qty-field"
                  name="qty"
                  label={QTY_FIELD}
                  variant="outlined"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.qty}
                />
                <Button variant="contained" color="primary" type="submit">
                  {BUY_BUTTON}
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
