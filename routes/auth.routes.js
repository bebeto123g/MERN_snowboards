const { Router } = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')

const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    // массив middleware для валидации
    check('email', `Некорректный email`).isEmail(),
    check('password', `Минимальная длина пароля 6 символов`).isLength({
      min: 6,
      max: 20,
    }),
  ],
  async (request, response) => {
    try {
      // сперва валидируем входящие поля
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: `Некорректные данные при регистрации`,
        })
      }

      const { email, password, userName, tel } = request.body

      // проверка на уникальность
      const candidate = await User.findOne({ email })

      // если кандидат уже есть
      if (candidate) {
        return response
          .status(400)
          .json({ message: `Пользователь уже существует!` })
      }

      // кандидата нет, то шифруем пароль bcryptjs
      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User({ email, password: hashedPassword, userName, tel })

      // сохраняем нового юзера
      await user.save()

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecretKey'), {
        expiresIn: '1h',
      })

      response.status(201).json({
        message: `Пользователь зарегестрирован`,
        token,
        userId: user.id,
        profile: {
          email: user.email,
          name: user.userName,
          tel: user.tel,
          register: user.dateRegister
        }
      })
    } catch (e) {
      response.status(500).json({ message: 'Неожиданная оказия на сервере!' })
    }
  }
)

// /api/auth/login
router.post(
  '/login',
  [
    check('email', `Некорректный email`).normalizeEmail().isEmail(),
    check('password', `Минимальная длина пароля 6 символов`).exists().isLength({
      min: 6,
      max: 20,
    }),
    // пароль просто должен существовать
  ],
  async (request, response) => {
    try {
      // сперва валидируем входящие поля
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: `Некорректные данные при входе в систему`,
        })
      }

      const { email, password } = request.body

      // ищем такого пользователя по email
      const user = await User.findOne({ email })

      // если его нет, бросаем в ответ ошибку
      if (!user) {
        return response
          .status(400)
          .json({ message: `Неверный EMAIL или пароль` })
      }

      // совпадают ли пароли
      const isMatch = await bcrypt.compare(password, user.password)

      // если пароли не совпадают
      if (!isMatch) {
        return response
          .status(400)
          .json({ message: `Неверный email или ПАРОЛЬ` })
      }

      // теперь пользователь есть и его пароль правильный
      // нужен jwtToken сгенерированный
      const token = jwt.sign({ userId: user.id }, config.get('jwtSecretKey'), {
        expiresIn: '1h',
      })

      response.json({
        token,
        userId: user.id,
        message: `Вы успешно вошли в систему!`,
        profile: {
          email: user.email,
          name: user.userName,
          tel: user.tel,
          register: +user.dateRegister
        }
      })

    } catch (e) {
      response.status(500).json({ message: 'Неожиданная оказия на сервере!' })
    }
  }
)

module.exports = router
