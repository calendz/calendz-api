const faker = require('faker')
const mongoose = require('mongoose')

module.exports = class Token {
  constructor({
    user = mongoose.Types.ObjectId(),
    value = faker.random.uuid(),
    type = faker.random.arrayElement(['EMAIL_VERIFICATION', 'PASSWORD_RESET']) 
  }) {
    this.user = user
    this.value = value
    this.type = type
  }
}