const express = require ('express')
const customerService = require('../services/customer.service')
const validatorHandler = require('../middlewares/validator.handler')
const {createCustomerSchema, updateCustomerSchema, getCustomerSchema} = require('../schemas/customer.schema')


const router =  express.Router()
const service = new customerService()

router.get('/', async (req,res,next)=>{
  try{
    const users = await service.find()
    res.json(users)
  }
  catch(error){
    next(error)
  }
})

router.get('/:id', validatorHandler(getCustomerSchema, 'params'), async (req, res, next) =>{
  try{
    const {id} = req.params;
    const customer = await service.findOne(id)
    res.json(customer)
  }
  catch(error){
    next(error)
  }
})

router.post('/', validatorHandler(createCustomerSchema, 'body'), async (req, res, next) => {
  try{
    const body = req.body
    const newCustomer = await service.create(body)
    res.status(201).json({
      message:"created",
      data:newCustomer
    })
  }
  catch(error){
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    const {id} = req.params
    const body = req.body
    const rta = await service.update(id,body)
    res.json(rta)
  }
  catch(error){
    next(error)
  }
})

router.patch('/:id', validatorHandler(getCustomerSchema, 'params'), validatorHandler(updateCustomerSchema, 'body'), async (req, res, next) => {
  try{
    const {id} = req.params
    const body = req.body
    const rta = await service.update(id,body)
    res.json(rta)
  }
  catch(error){
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try{
    const {id} = req.params
    const rta = await service.delete(id)
    res.json(rta)
  }
  catch(error){
    next(error)
  }
})

module.exports = router
