const { Router } = require('express')
const Order = require('../models/Order')
const auth = require('../middleware/auth.middleware')
const config = require('config')

const router = Router()

// делаем заказ
router.post('/add', auth, async (request, response) => {
  try {
    const { cart, sum } = request.body

    const order = new Order({
      cart,
      sum,
      owner: request.user.userId,
      status: 'В обработке...',
    })

    await order.save()

    response.status(201).json({ message: `Заказ успешно оформлен!` })
  } catch (e) {
    response.status(500).json({ message: `Непредвиденная оказия на сервере!` })
  }
})

// смотрим свои заказы
// поиск делаем с помозью jwt токену, для этого добавляем middleware
// которые делает в request токен по ключу user.userId, как мы сделали в прослойке
router.get('/', auth, async (request, response) => {
  try {
    const orders = await Order.find({ owner: request.user.userId })
    // вот тут middleware помогает
    response.json(orders)
  } catch (e) {
    response.status(500).json({ message: `Непредвиденная оказия на сервере!` })
  }
})

// получаем заказ по id
router.get('/:id', auth, async (request, response) => {
  try {
    const order = await Order.findById(request.params.id)
    response.json(order)
  } catch (e) {
    response.status(500).json({ message: `Непредвиденная оказия на сервере!` })
  }
})

// редактирование заказа
router.put('/:id', auth, async (request, response) => {
  try {
  } catch (e) {
    response.status(500).json({ message: `Непредвиденная оказия на сервере!` })
  }
})

// удаляем выбранный заказ
router.delete('/:id', async (request, response) => {
  try {
  } catch (e) {
    response.status(500).json({ message: `Непредвиденная оказия на сервере!` })
  }
})

module.exports = router
