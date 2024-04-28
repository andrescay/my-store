const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')
const { Op } = require('sequelize')

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
      include:['category'],
      where:{}
    }

    const {offset, limit} = query
    if(offset && limit){
      options.offset = offset
      options.limit = limit
    }

    const {category, price_min, price_max} = query
    if(category){
      options.where.categoryId = Number(category)
    }

    if( price_min && price_max){
      options.where.price = {
        [Op.between]: [price_min, price_max]
      }
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
