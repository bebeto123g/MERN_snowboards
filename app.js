const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/orders', require('./routes/order.routes'))
// app.use('/api/manager', require('./routes/manager.routes'))
app.use('/api/admin', require('./routes/admin.routes'))

const PORT = config.get('port') || 5000

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    app.listen(PORT, () => console.log(`Приложение запущено на порте ${PORT}`))
  } catch (error) {
    console.log('Server Error', error.message)
    process.exit(1)
  }
}

start()
