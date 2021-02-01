const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  // строка, обязательное, уникальное
  password: { type: String, required: true },
  orders: [{ type: Types.ObjectId, ref: 'Order' }],
  profile: { type: Object, ref: 'Profile' }
  // тип заказы - массив, реф - к какой коллекции модели мы привязываемся
})

module.exports = model('User', schema)
