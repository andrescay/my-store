const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class productsService {
  constructor(){}

  async create(data){
    const newProduct = await models.Product.create(data)
    return newProduct
  }

  async findOne(id){
    const product = await models.Product.findByPk(id)
    if(!product){
      throw boom.notFound('product not found')
    }
    return product
  }

  async find(query){
    const options = {
      include:['category']
    }
    const {offset, limit} = query
    if(offset && limit){
      options.offset = offset
      options.limit = limit
    }
    const categories = await models.Product.findAll(options)
    return categories
  }

  async update(id, changes){
    const product = await this.findOne(id)
    const rta = await product.update(changes)
    return rta
  }

  async delete(id){
    const product = await this.findOne(id)
    await product.destroy()
    return { id }
  }
}

module.exports = productsService
