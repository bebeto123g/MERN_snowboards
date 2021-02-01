const { Router, request, response} = require('express')
const Order = require('../models/Order')

const router = Router()

// делаем заказ
router.post('/add',async (request, response) => {
  try {
    
  } catch (e) {
    response.status(500).json({message: `Непредваиденная оказия на сервере!`})
  }
})

// смотрим свои заказы
router.get('/',async (request, response) => {
  try {
    
  } catch (e) {
    response.status(500).json({message: `Непредваиденная оказия на сервере!`})
  }
})

// получаем заказ по id
router.get('/:id',async (request, response) => {
  try {
    
  } catch (e) {
    response.status(500).json({message: `Непредваиденная оказия на сервере!`})
  }
})

// редактирование заказа
router.put('/:id',async (request, response) => {
  try {
    
  } catch (e) {
    response.status(500).json({message: `Непредваиденная оказия на сервере!`})
  }
})

// удаляем выбранный заказ
router.delete('/:id',async (request, response) => {
  try {
    
  } catch (e) {
    response.status(500).json({message: `Непредваиденная оказия на сервере!`})
  }
})

module.exports = router