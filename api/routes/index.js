const productsRouter  =require('./products.router')
const usersRouter  =require('./users.router')
const categoriesRouter  =require('./categories.router')
const express = require('express')

function routerApi(app){
  const router = express.Router()
  app.get('/api', (req, res) =>{
    res.send('Conseguido mi primer despliegue!!!')
  })
  app.use('/api/v1', router) // Uso esta url base
  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)

  const router2 = express.Router()
  app.use('/api/v2', router) // Uso esta url base
  router2.use('/products', productsRouter)
}


module.exports = routerApi
