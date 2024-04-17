const express = require ("express")
const ProductsService = require('./../services/products.service')

const router = express.Router()
const service = new ProductsService()

router.get('/', async (req, res) =>{
  const products = await service.find()
  res.json(products)
})

router.get('/:id', async (req, res, next) =>{
  try{
    const {id} = req.params;
    const product = await service.findOne(id)
    res.json(product)
  }
  catch(error){
    next(error)
  }
})

router.post('/', async (req, res, next) => {
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

router.patch('/:id', async (req, res, next) => {
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
