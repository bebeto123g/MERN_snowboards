const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  // строка, обязательное, уникальное
  password: { type: String, required: true },
  // orders: [{ type: Types.ObjectId, ref: 'Order' }],
  dateRegister: { type: Date, default: Date.now },
  userName: { type: String },
  tel: { type: String },
  root: { type: String }
})

module.exports = model('User', schema)
