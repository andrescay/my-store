
const { models } = require('./../libs/sequelize')
const boom = require('@hapi/boom')

class UserService {
  constructor(){}

  async findOne(id){
    const user = await models.User.findByPk(id)
    if(!user){
      throw boom.notFound('user not found')
    }
    return user
  }

  async findByEmail(email){
    const user = await models.User.findOne({
      where: {email}
    })
    return user
  }

  async create(data){
    const newUser = await models.User.create(data);
    delete newUser.dataValues.password
    return newUser
  }

  async find(){
    const rta = await models.User.findAll({
      include: ['customer']
    })
    return rta
  }

  async update(id,changes){
    const user = await this.findOne(id)
    const rta = await user.update(changes)
    return rta
  }

  async delete(id){
    const user = await this.findOne(id)
    await user.destroy()
    return { id }
  }
}

module.exports = UserService
