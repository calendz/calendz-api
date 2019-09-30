const faker = require('faker')

module.exports = class User {
  constructor ({
    firstname = faker.name.firstName(),
    lastname = faker.name.lastName(),
    email = faker.internet.email(),
    password = faker.internet.password(),
    permissionLevel = 'MEMBER',
    grade = faker.random.arrayElement(['B1', 'B2', 'B3', 'I1', 'I2']),
    city = faker.random.arrayElement(['Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Paris', 'Dakar']),
    bts = faker.random.boolean(),
    isActive = faker.random.boolean(),
    hasInformationMails = faker.random.boolean(),
    creationDate = new Date(faker.date.recent(365)).getTime()
  }) {
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.password = password
    this.permissionLevel = permissionLevel
    this.grade = grade
    this.city = city
    this.bts = bts
    this.isActive = isActive
    this.hasInformationMails = hasInformationMails
    this.creationDate = creationDate
  }
}
