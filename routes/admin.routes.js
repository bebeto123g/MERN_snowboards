const { Router } = require('express')
const config = require('config')

const getListManager = require('./adminRoutes/gitListManager')
const getDetailManager = require('./adminRoutes/getDetailManager')
const postAddManager = require('./adminRoutes/postAddManager')
const deleteManager = require('./adminRoutes/deleteManager')

const router = Router()

// middleware для проверки auth данных и выкидывания ошибки

router.get('/list-manager', 'middleware', getListManager)
router.get('/manager/:id', 'middleware', getDetailManager)

router.post('/manager/add', 'middleware', postAddManager)

router.put('/manager/put/:id', 'middleware', putDetailManager)

router.delete('/manager/delete/:id', 'middleware', deleteManager)

module.exports = router
