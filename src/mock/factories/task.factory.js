const faker = require('faker')
const mongoose = require('mongoose')

module.exports = class Task {
  constructor ({
    author = mongoose.Types.ObjectId(),
    date = new Date(faker.date.recent(-30)).getTime(),
    type = faker.random.arrayElement(['DS', 'homework', 'task']),
    title = faker.lorem.lines(1),
    description = null,
    subject = '',
    city = null,
    grade = null,
    group = null,
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
