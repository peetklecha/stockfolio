const router = require('express').Router()
const {Stock, Transaction, User} = require('../db/models')
const {checkUser} = require('../utils')

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
  try {
    const {symbol, qty, price} = req.body
    const stock = await Stock.findOrCreate({
      where: {symbol, userId: req.params.id}
    })
    if (stock) {
      const updatedStock = await stock[0].update({
        shares: +stock[0].shares + +qty
      })
      if (updatedStock) {
        const user = await User.findByPk(req.params.id)
        if (user) {
          const updatedUser = await user.update({
            cash: user.cash - +qty * +price
          })
          if (updatedUser) {
            res.json({stock: updatedStock, user: updatedUser})
          } else throw new Error('Error updating user entry.')
        } else throw new Error('Error finding user entry.')
      } else throw new Error('Error updating stock entry.')
    } else throw new Error('Error finding/creating stock entry.')
  } catch (error) {
    next(error)
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
    if (transaction) res.json(transaction)
  } catch (error) {
    next(error)
  }
})
