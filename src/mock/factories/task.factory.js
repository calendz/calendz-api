const faker = require('faker')
const mongoose = require('mongoose')

module.exports = class Task {
  constructor ({
                 _id = mongoose.Types.ObjectId(),
                 author = mongoose.Types.ObjectId(),
                 date = new Date(faker.date.recent(-30)).getTime(),
                 type = faker.random.arrayElement(['DS', 'homework', 'task']),
                 title = faker.lorem.lines(1),
                 description = null,
                 subject = faker.lorem.lines(1),
                 school = faker.random.arrayElement(['EPSI', 'WIS']),
                 grade = faker.random.arrayElement(['SN1', 'SN2', 'B3', 'I1', 'I2', 'WIS1', 'WIS2', 'WIS3', 'WIS4', 'WIS5']),
                 group = faker.random.arrayElement(['G1', 'G2', 'G3', 'G1 (dev)', 'G2 (dev)', 'G3 (dev)', 'G1 (infra-réseau)', 'G2 (infra-réseau)', 'G3 (infra-réseau)', 'G1 (ERP)', 'G2 (ERP)']),
                 city = faker.random.arrayElement(['Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Rennes', 'Toulouse', 'Paris', 'Dakar']),
                 targets = []
               }) {
    this._id = _id
    this.author = author
    this.date = date
    this.type = type
    this.title = title
    this.description = description
    this.subject = subject
    this.school = school
    this.city = city
    this.grade = grade
    this.group = group
    this.targets = targets
  }
}
