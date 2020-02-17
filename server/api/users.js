const router = require('express').Router()
const {Stock, Transaction} = require('../db/models')
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

router.get('/:id/history', checkUser, async (req, res, next) => {
  try {
    console.log('in get route')
    const history = await Transaction.findAll({
      where: {userId: req.params.id}
    })
    console.log('good so far')
    res.json(history)
  } catch (err) {
    next(err)
  }
})
