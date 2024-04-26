const expres = require('express')
const OrderService = require('../services/order.service')
const validatorHandler = require('../middlewares/validator.handler')
const { getOrderSchema, createOrderSchema, updateOrderSchema } = require('../schemas/order.schema')

const router = expres.Router()
const service = new OrderService()

router.get('/', async(req, res, next) => {
  try{
    const orders = await service.find()
    res.json(orders)
  }
  catch(error){
    next(error)
  }
})

router.get('/:id', validatorHandler(getOrderSchema, 'params'),async(req, res, next) => {
  try{
    const { id } = req.params
    const order = await service.findOne(id)
    res(order)
  }
  catch(error){
    next(error)
  }
})

router.post('/', validatorHandler(createOrderSchema, 'body') ,async(req, res, next) => {
  try{
    const body = req.body
    const newOrder = await service.create(body)
    res.status(201).json({
      message:'created',
      data:newOrder
    })
  }
  catch(error){
    next(error)
  }
})

router.patch('/:id', validatorHandler(getOrderSchema, 'params'), validatorHandler(updateOrderSchema, 'body') ,async(req, res, next) => {
  try{
    const { id } = req.params
    const body = req.body
    const rta = await service.create(id, body)
    res(rta)
  }
  catch(error){
    next(error)
  }
})

router.delete('/:id', async(req, res, next) => {
  try{
    const { id } = req.params
    const rta = await service.delete(id)
    res(rta)
  }
  catch(error){
    next(error)
  }
})

module.exports = router
