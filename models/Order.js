const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  date: { type: Date, default: Date.now },
  status: String,
  sum: Number,
  cart: { type: Array },
  owner: { type: Types.ObjectId, ref: 'User' },
})

module.exports = model('Order', schema)
