const faker = require('faker')

module.exports = class Token {
  constructor({
    user = faker.random.number(),
    value = faker.random.uuid(),
    type = faker.random.arrayElement(['EMAIL_VERIFICATION', 'PASSWORD_RESET']) 
  }) {
    this.user = user
    this.value = value
    this.type = type
  }
}