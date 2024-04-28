const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class orderService{
  constructor(){}

  async create(data){
    const newOrder = await models.Order.create(data)
    return newOrder
  }

  async addItem(data){
    const newItem = await models.OrderProduct.create(data)
    return newItem
  }

  async findOne(id){
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    })
    if(!order){
      throw boom.notFound('order not found')
    }
    return order
  }

  async find(){
    const rta = await models.Order.findAll({
      include: [{
        association: 'customer',
        include: ['user']
      }]
    })
    return rta
  }


  async update(id, data){
    const order = await this.findOne(id)
    const rta = await order.update(data)
    return rta
  }

  async delete(id){
    const order = await this.findOne(id)
    order.destroy()
    return { id }
  }
}

module.exports = orderService
