const productsRouter = require('./products.router')
const usersRouter = require('./users.router')
const categoriesRouter = require('./categories.router')
const customerRouter = require('./customers.router')
const orderRouter = require('./orders.router')
const authRouter = require('./auth.router')

const express = require('express')

function routerApi(app){
  const router = express.Router()
  app.use('/api/v1', router) // Uso esta url base
  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)
  router.use('/customers', customerRouter)
  router.use('/orders', orderRouter)
  router.use('/auth', authRouter)

  const router2 = express.Router()
  app.use('/api/v2', router) // Uso esta url base
  router2.use('/products', productsRouter)
}


module.exports = routerApi
