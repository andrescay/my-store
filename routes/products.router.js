const express = require ("express")
const ProductsService = require('./../services/product.service')
const validatorHandler = require('./../middlewares/validator.handler')
const {createProductSchema, updateProductSchema, getProductSchema, queryProductSchema} = require('./../schemas/product.schema')

const router = express.Router()
const service = new ProductsService()

router.get('/', validatorHandler(queryProductSchema, 'params'), async (req, res) =>{
  const products = await service.find(req.query)
  res.json(products)
})

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) =>{
  try{
    const {id} = req.params;
    const product = await service.findOne(id)
    res.json(product)
  }
  catch(error){
    next(error)
  }
})

router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res, next) => {
  try{
    const body = req.body
    const newProduct = await service.create(body)
    res.status(201).json({
      message:"created",
      data:newProduct
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

router.patch('/:id', validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), async (req, res, next) => {
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
