const boom = require('@hapi/boom')

function validatorHandler (eschema, property){
  // Se crea una función que retorna middlewares "dinámicos"
  return (req, res, next) =>{
    const data = req[property]
    console.log('***************')
    console.log(data)
    const { error } = eschema.validate(data, {abortEarly: false})
    if(error){
      next(boom.badRequest(error))
    }
    next()
  }
}

module.exports = validatorHandler
