const express = require ('express')
const categoryService = require('../services/category.service')
const validatorHandler = require('../middlewares/validator.handler')
const {createCategorySchema, updateCategorySchema, getCategorySchema} = require('../schemas/category.schema')


const router = express.Router()
const service = new categoryService()

router.get('/', async (req,res,next)=>{
  try{
    const categories = await service.find()
    res.json(categories)
  }
  catch(error){
    next(error)
  }
})

router.get('/:id', validatorHandler(getCategorySchema, 'params'), async (req, res, next) =>{
  try{
    const {id} = req.params;
    const category = await service.findOne(id)
    res.json(category)
  }
  catch(error){
    next(error)
  }
})

router.post('/', validatorHandler(createCategorySchema, 'body'), async (req, res, next) => {
  try{
    const body = req.body
    const newCategory = await service.create(body)
    res.status(201).json({
      message:"created",
      data:newCategory
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

router.patch('/:id', validatorHandler(getCategorySchema, 'params'), validatorHandler(updateCategorySchema, 'body'), async (req, res, next) => {
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
