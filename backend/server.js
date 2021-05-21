const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const { stockRouter } = require('./routes/stock')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost/stock_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('DATABASE CONNNECTED')
})

app.use('/', stockRouter)

app.listen(3001, () => {
  console.log('APP LISTENING ON PORT 3001')
})
