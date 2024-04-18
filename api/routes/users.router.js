const express = require ("express")
const {faker} = require('@faker-js/faker')


const router =  express.Router()

router.get('/',(req,res)=>{
  const {limit, offset}= req.query

  if(limit && offset){
    const users = []
    for (let index = 0; index < limit; index++) {
      users.push({
        firstName: faker.person.firstName(),
        firstLastname: faker.person.lastName(),
        age: Math.floor(Math.random() * 71)
      })
    }
    res.json(users)
  }
  else{
    res.send('No hay parámetros')
  }
})

module.exports = router
