const express = require("express")
const cors = require('cors')
const routerApi = require('./routes')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')
const app = express()
require('dotenv').config({path:'./.env'});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000

app.use(express.json()) // Middleware para utilizar JSON

const whiteList = ['http://localhost:8080','htttps://myapp.co']
const options ={
  origin: (origin, callback) =>{
    if(whiteList.includes(origin) || !origin){
      callback(null,true)
    }
    else{
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options)) // Permite recibir solicitudes que provengan desde un sitio de la whitelist
// app.use(cors()) // Permite recibir solicitudes desde cualquier origen

routerApi(app) // Routing
app.use(logErrors) // Middleware para imprimir error
app.use(boomErrorHandler) // Middleware para manejar error utilizando boom
app.use(errorHandler) // Middleware para manejar error

app.listen(port,()=> {
  console.log(`Mi port: ${port}`)
})
