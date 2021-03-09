const { Router } = require('express')
const config = require('config')

const router = Router()

// Каждое изменение пользователя\заказа\товара оставляет id-манагера и время изменения в отдельном массиве

// get загрузку постранично и замутить пагинацию на админке
// TODO: получение каталога по производителю getCatalogBrand
// TODO: получение каталога по году выпуска getCatalogYear
// TODO: получение каталога по цене getCatalogPrice
// TODO: получение продукта по ID getProduct
// TODO: получение каталога по цене getProductSearch

// TODO: загрузку заказов getOrdersList
// TODO: загрузку заказа по ID getOrder
// TODO: загрузку заказа getOrderSearch

// TODO: загрузка пользователей getAllUsers
// TODO: загрузка списка по поиску getUserSearch

// post
// TODO: добавление нового товара postAddProduct
// TODO: добавить middleware для проверки целостности схемы

// put
// TODO: изменение данных товара putDetailProduct
// TODO: изменение статуса заказа и его корзины putOrderStatus
// TODO: изменение профилей пользователей putUserProfile

// delete
// TODO: удалить товар из каталога deleteProduct
// TODO: удалить заказ из базы deleteOrder
// TODO: удаление пользователей deleteUser

module.exports = router
