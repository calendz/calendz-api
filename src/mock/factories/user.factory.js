const faker = require('faker')

module.exports = class User {
  constructor ({
    firstname = faker.name.firstName(),
    lastname = faker.name.lastName(),
    email = faker.internet.email(),
    password = faker.internet.password(),
    avatarUrl = faker.internet.avatar(),
    permissionLevel = 'MEMBER',
    school = faker.random.arrayElement(['EPSI', 'WIS']),
    grade = faker.random.arrayElement(['B1', 'B2', 'B3', 'I1', 'I2']),
    group = faker.random.arrayElement(['G1', 'G2', 'G3', 'G1 (dev)', 'G2 (dev)', 'G3 (dev)', 'G1 (infra-réseau)', 'G2 (infra-réseau)', 'G3 (infra-réseau)', 'G1 (ERP)', 'G2 (ERP)']),
    city = faker.random.arrayElement(['Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Paris', 'Dakar']),
    bts = faker.random.boolean(),
    isActive = faker.random.boolean(),
    hasInformationMails = faker.random.boolean(),
    creationDate = new Date(faker.date.recent(365)).getTime(),
    lastActiveDate = new Date(faker.date.recent(30)).getTime(),
    settings = {
      calendarColor: '172b4d',
      mail: {
        taskCreate: faker.random.boolean()
      }
    },
    tasks = {
      done: []
    }
  }) {
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.password = password
    this.avatarUrl = avatarUrl
    this.permissionLevel = permissionLevel
    this.school = school
    this.grade = grade
    this.group = group
    this.city = city
    this.bts = bts
    this.isActive = isActive
    this.hasInformationMails = hasInformationMails
    this.creationDate = creationDate
    this.lastActiveDate = lastActiveDate
    this.settings = settings
    this.tasks = tasks
  }
}
