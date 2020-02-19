import {PORTFOLIO_LABEL, CASH_LABEL} from './components/constants'

export const arrayReplace = (arr, elem, identifier) => {
  const newArr = [...arr]
  const index = newArr.findIndex(
    eachElem => eachElem[identifier] === elem[identifier]
  )
  newArr[index] = elem
  return newArr
}

export const centipennies = dollars => Math.floor(dollars * 10000)

export const dollars = cpennies => cpennies / 10000

export const displayCpennies = cpennies => dollars(cpennies).toFixed(2)

export const displayDollars = dollarAmount =>
  Number.parseFloat(dollarAmount).toFixed(2)

export const stockChange = stock =>
  stock.latestPrice > stock.open
    ? 'up'
    : stock.latestPrice < stock.open && 'down'

const getPortfolioValue = portfolio => {
  const stocksWithQuotes = portfolio.filter(stock => stock.latestPrice)
  const tail = stocksWithQuotes.length < portfolio.length ? '...' : ''
  return (
    stocksWithQuotes
      .map(stock => stock.shares * stock.latestPrice)
      .reduce((x, y) => x + y, 0)
      .toFixed(2)
      .toString() + tail
  )
}

export const portfolioHeader = portfolio =>
  PORTFOLIO_LABEL + ` ($${getPortfolioValue(portfolio)})`

export const cashHeader = cash => CASH_LABEL + ` $${displayCpennies(cash)}`
