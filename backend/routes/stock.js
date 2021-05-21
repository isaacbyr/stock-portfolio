const express = require('express')
const router = express.Router()
const Stock = require('../models/stock')

router.post('/newstock', async (req, res) => {
  const { symbol, open, high, low, price, volume, change } = req.body
  const stock = await new Stock({
    symbol,
    open,
    high,
    low,
    price,
    volume,
    change,
  })
  await stock.save()
  console.log(stock)
})

router.get('/stocks', async (req, res) => {
  const stocks = await Stock.find({})
  res.json(stocks)
})

router.post('/deleteall', async (req, res) => {
  await Stock.deleteMany({})
})

router.post('/delete/:id', async (req, res) => {
  const { id } = req.params
  await Stock.findByIdAndDelete(id)
})

module.exports.stockRouter = router
