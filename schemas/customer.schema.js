const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(3).max(30)
const lastName = Joi.string().min(3).max(30)
const phone = Joi.number().integer().min(1000000000).max(9999999999)
const userId = Joi.number().integer()
const email = Joi.string().email()
const password = Joi.string().min(8)
const role = Joi.string().min(5)

const getCustomerSchema = Joi.object({
  id: id.required(),
})

const createCustomerSchema = Joi.object({
  name : name.required(),
  lastName : lastName.required(),
  phone : phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
    role: role,
  })
})

const updateCustomerSchema = Joi.object({
  name : name.required(),
  lastName : lastName.required(),
  userId : userId.required(),
  phone : phone.required()
})

module.exports = {getCustomerSchema, createCustomerSchema, updateCustomerSchema }
