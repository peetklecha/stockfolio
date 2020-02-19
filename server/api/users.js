const router = require('express').Router()
const axios = require('axios')
const {Stock, Transaction, User} = require('../db/models')
const {checkUser, singleApi, centipennies} = require('../utils')

module.exports = router

router.get('/:id/portfolio', checkUser, async (req, res, next) => {
  try {
    const portfolio = await Stock.findAll({
      where: {userId: req.params.id}
    })
    res.json(portfolio)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/portfolio', checkUser, async (req, res, next) => {
  const {symbol} = req.body
  const qty = +req.body.qty
  if (qty < 0 || !Number.isInteger(qty)) {
    try {
      res.status(400).send('!!!Please enter a valid quantity.')
    } catch (error) {
      next(error)
    }
  } else {
    let quote
    try {
      quote = await axios.get(singleApi(symbol))
    } catch (error) {
      if (error.response.status === 404)
        res.status(404).send('Not a valid symbol.')
      else next(error)
      return
    }
    try {
      const price = +quote.data.latestPrice
      const cash = +(await User.findByPk(req.params.id)).cash
      if (qty * centipennies(price) > cash)
        res.status(400).send('Insufficient funds.')
      else {
        const stock = await Stock.findOrCreate({
          where: {symbol, userId: req.params.id}
        })
        const updatedStock = await stock[0].update({
          shares: +stock[0].shares + qty
        })
        const user = await User.findByPk(req.params.id)
        const updatedUser = await user.update({
          cash: user.cash - qty * centipennies(price)
        })
        res.json({
          stock: updatedStock,
          user: updatedUser,
          latestPrice: price,
          latestTime: quote.data.latestTime,
          open: quote.data.open
        })
      }
    } catch (error) {
      next(error)
    }
  }
})

router.get('/:id/history', checkUser, async (req, res, next) => {
  try {
    const history = await Transaction.findAll({
      where: {userId: req.params.id}
    })
    res.json(history)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/history', checkUser, async (req, res, next) => {
  try {
    const {symbol, qty, price} = req.body
    const transaction = await Transaction.create({
      symbol,
      shares: qty,
      price,
      userId: req.params.id
    })
    res.json(transaction)
  } catch (error) {
    next(error)
  }
})
