const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  // id: { type: Types.ObjectId, unique: true },
  date: { type: Date, default: Date.now },
  sum: Number,
  store: Object,
  owner: { type: Types.ObjectId, ref: 'User' },
})

module.exports = model('Order', schema)
