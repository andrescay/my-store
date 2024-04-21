const Joi = require('joi')

const id = Joi.number().integer();
const email = Joi.string().email()
const password = Joi.string().min(8)
// const role = Joi.string().min(15)

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  // role: role.required(),
})

const updateUserSchema = Joi.object({
  email: email,
  password: password,
})

const getUserSchema = Joi.object({
  id: id.required(),
})

module.exports = {createUserSchema, updateUserSchema, getUserSchema}
