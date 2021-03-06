const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (request, response, next) => {
  // next позволяет сделать продолжение запроса
  if (request.method === 'OPTIONS') {
    return next()
  }

  try {
    const bearer = request.headers.authorization // 'Bearer TOKEN'
    const token = bearer.split(' ')[1]

    if (!token) {
      response.status(401).json({ message: `Нет авторизации` })
      return
    }

    request.user = jwt.verify(token, config.get('jwtSecretKey'))

    next()
  } catch (e) {
    response.status(401).json({ message: `Проблемы авторизации` })
  }
}
