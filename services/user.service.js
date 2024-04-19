// const boom = require('@hapi/boom')
const getConection = require('./../libs/postgres')

class userService {
  constructor(){}

  async create(data){
    return data
  }

  async find(){
    const client = await getConection()
    const rta = await client.query('SELECT * FROM TASKS')
    return rta.rows
  }

  async findOne(id){
    return { id }
  }

  async update(id,changes){
        return {
          id,
          changes
        }
  }

  async delete(id){
    return { id }
  }
}

module.exports = userService
