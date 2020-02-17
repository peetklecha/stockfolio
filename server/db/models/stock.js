const Sequelize = require('sequelize')
const db = require('../db')

const Stock = db.define('stock', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false
  }
})

module.exports = Stock
