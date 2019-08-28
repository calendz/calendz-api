const faker = require('faker')
const mongoose = require('mongoose')

module.exports = class Token {
  constructor ({
    user = mongoose.Types.ObjectId(),
    title = faker.lorem.lines(1),
    message = faker.lorem.lines(2),
    icon = 'fas fa-bell',
    type = faker.random.arrayElement(['success', 'primary', 'default', 'warning', 'danger', 'info', 'pink', 'purple', 'grey', 'yellow']),
    timestamp = new Date(faker.date.recent(31 * 12)).getTime(),
    isRead = faker.random.boolean()
  }) {
    this.user = user
    this.title = title
    this.message = message
    this.icon = icon
    this.type = type
    this.timestamp = timestamp
    this.isRead = isRead
  }
}
