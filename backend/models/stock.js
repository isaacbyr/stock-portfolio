const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema({
  symbol: String,
  open: String,
  high: String,
  low: String,
  price: String,
  volume: String,
  change: String,
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock
