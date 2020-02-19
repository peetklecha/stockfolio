const apiKey = require('../secrets')

const checkUser = (req, res, next) => {
  if (req.user.id === +req.params.id) {
    next()
  } else res.sendStatus(503)
}

const singleApi = symbol =>
  `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${apiKey}`

const batchApi = symbols =>
  `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols.join(
    ','
  )}&types=quote&token=${apiKey}`

module.exports = {
  checkUser,
  singleApi,
  batchApi
}
