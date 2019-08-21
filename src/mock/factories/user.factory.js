const faker = require('faker')

module.exports = class User {
  constructor ({
    firstname = faker.name.firstName(),
    lastname = faker.name.lastName(),
    email = faker.internet.email(),
    password = faker.internet.password(),
    permissionLevel = 'MEMBER',
    grade = faker.random.arrayElement(['B1 G1', 'B1 G2', 'B2 G1', 'B2 G2', 'B3 G1', 'B3 G2', 'B3 G3', 'I4 G1', 'I4 G2', 'I5 G1', 'I5 G2']),
    bts = faker.random.boolean(),
    isActive = faker.random.boolean(),
    hasInformationMails = faker.random.boolean()
  }) {
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.password = password
    this.permissionLevel = permissionLevel
    this.grade = grade
    this.bts = bts
    this.isActive = isActive
    this.hasInformationMails = hasInformationMails
  }
}
