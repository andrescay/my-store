const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')

class productsService {
  constructor(){
    this.products = []
    this.genereate()
  }

  async genereate(){
    const limit = 10
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        price: parseInt(faker.commerce.price({ min: 1000, max: 3000, dec: 0 })),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create(data){
    const newproduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newproduct)
    return newproduct
  }

  async find(){
    return this.products
  }

  async findOne(id){
    const product = this.products.find(product => product.id === id)
    if(!product){
      throw boom.notFound('product not found')
    }
    if(product.isBlock){
      throw boom.conflict('product is block')
    }
    return product
  }

  async update(id,changes){
    const index = this.products.findIndex(product => product.id === id)
    if(index === -1 ){
      throw boom.notFound('product not found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  async delete(id){
    const index = this.products.findIndex(product => product.id === id)
    if(index === -1 ){
      throw boom.notFound('product not found')
    }
    this.products.splice(index,1)
    return { id }
  }
}

module.exports = productsService
