const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  dateRegister: { type: Date, default: Date.now },
  userName: { type: String, default: 'defaultUser' },
  age: { type: Date, default: Date.now },
  phone: { type: String, default: '88002000600' },
})

module.exports = model('Profile', schema)
