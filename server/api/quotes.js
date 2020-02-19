const router = require('express').Router()
const axios = require('axios')
const {Stock} = require('../db/models')
const {checkUser, batchApi, singleApi} = require('../utils')

module.exports = router

router.get('/user/:id', checkUser, async (req, res, next) => {
  try {
    const portfolio = await Stock.findAll({
      where: {userId: req.params.id}
    })
    const symbols = portfolio.map(stock => stock.symbol)
    const quotesObj = await axios.get(batchApi(symbols))
    res.json(quotesObj.data)
  } catch (error) {
    next(error)
  }
})

router.get('/single/:symbol', async (req, res, next) => {
  try {
    const quote = await axios.get(singleApi(req.params.symbol))
    res.json(quote.data)
  } catch (error) {
    next(error)
  }
})
