const { ValidationError } = require("sequelize");

function logErrors (err, req, res, next){
  console.error(err)
  next(err)
}

// eslint-disable-next-line no-unused-vars
function errorHandler (err, req, res, next){
  if(err.message.includes('a foreign key constraint fails')){
    res.status(500).json({
      message: `"${err.table}Id" is not a valid option`,
      error: `${err.table} does not exist`
    })
  }
  else{
    res.status(500).json({
      message: err.message,
      stack: err.stack
    })
  }
}

function boomErrorHandler (err, req, res, next){
  if(err.isBoom){
    const {output} = err;
    res.status(output.statusCode).json(output.payload)
  }
  else{
    next(err)
  }
}

function ormErrorHandler (err, req, res, next){
  if( err instanceof ValidationError){
    const errorMessages = err.errors.map(error => error.message);
    if(err.name === 'SequelizeUniqueConstraintError'){
      res.status(409).json({
        statusCode: 409,
        message: 'unique constraint error',
        errors: errorMessages
      })
    }
    else{
      res.status(409).json({
        statusCode: 409,
        message: err.name,
        errors: errorMessages
      })
    }
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: errorMessages    })
  }
  else{
    next(err)
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
