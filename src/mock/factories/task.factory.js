const faker = require('faker')
const mongoose = require('mongoose')

module.exports = class Task {
  constructor ({
    author = mongoose.Types.ObjectId(),
    date = new Date(faker.date.future(31)).getTime(),
    type = faker.random.arrayElement(['DS', 'homework', 'task']),
    title = faker.lorem.lines(1),
    description = faker.lorem.lines(2),
    subject = faker.random.words(2),
    city = faker.random.arrayElement(['Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Paris', 'Dakar']),
    grade = faker.random.arrayElement(['B1', 'B2', 'B3', 'I1', 'I2']),
    group = faker.random.arrayElement(['G1', 'G2', 'G3', 'G1 (dev)', 'G2 (dev)', 'G3 (dev)', 'G1 (infra-réseau)', 'G2 (infra-réseau)', 'G3 (infra-réseau)']),
    targets = []
  }) {
    this.author = author
    this.date = date
    this.type = type
    this.title = title
    this.description = description
    this.subject = subject
    this.city = city
    this.grade = grade
    this.group = group
    this.targets = targets
  }
}
