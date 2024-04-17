const express = require ("express")
const routerApi = require('./routes')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

const app = express()
const port = 3000

app.use(express.json()) // Middleware para utilizar JSON
routerApi(app) // Routing
app.use(logErrors) // Middleware para imprimir error
app.use(boomErrorHandler) // Middleware para manejar error utilizando boom
app.use(errorHandler) // Middleware para manejar error

app.listen(port,()=> {
  console.log(`Mi port: ${port}`)
})
