const faker = require('faker')
const mongoose = require('mongoose')

module.exports = class Grade {
  constructor ({
    user = mongoose.Types.ObjectId(),
    value = faker.random.number(20),
    coefficient = faker.random.arrayElement([1, 2, 3, 4]),
    subject = faker.random.arrayElement(['Français', 'Anglais', 'Communication', 'Mathématiques', 'C++', 'Gestion de projet']),
    date = new Date(faker.date.recent(-30)).getTime(),
    description = faker.random.words(6)
  }) {
    this.user = user
    this.value = value
    this.coefficient = coefficient
    this.subject = subject
    this.date = date
    this.description = description
  }
}
