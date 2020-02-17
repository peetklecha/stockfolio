const User = require('./user')
const Stock = require('./stock')
const Transaction = require('./transaction')

Stock.belongsTo(User)
Transaction.belongsTo(User)

module.exports = {
  User,
  Stock,
  Transaction
}
