const config = require('../config/config')
const initMongo = require('../config/mongoose')
const bcrypt = require('bcryptjs')
const logger = require('../config/winston')

const User = require('../models/user.model')

if (config.node_env === 'mock') {
  initMongo(async () => {
    // 2nd: if needed: populate db w/ fake dataset
    if (config.populate) {
      logger.info('===== Started dataset =====')
      await this.removeAllData().then(async () => {
        await this.seedData().then(() => {
          logger.info('===== Dataset completed =====')
          process.exit(0)
        })
      })
    }
  })
}

// ===================================
// == start by removing all data
// ===================================
module.exports.removeAllData = async function removeAllData () {
  try {
    await User.deleteMany({})
    logger.info('=> Successfully removed all existent data')
  } catch (err) {
    logger.error(err)
  }
}

// ===================================
// == add data
// ===================================
module.exports.seedData = async function seedData () {
  try {
    // users
    const user1 = new User({
      firstname: 'Arthur',
      lastname: 'Dufour',
      email: 'arthur.dufour@epsi.fr',
      password: bcrypt.hashSync('password', 10),
      permissionLevel: 'MEMBER',
      grade: 'B3 G1',
      bts: false,
      isActive: true
    })
    const user2 = new User({
      firstname: 'Alexandre',
      lastname: 'Tuet',
      email: 'alexandre.tuet@epsi.fr',
      password: bcrypt.hashSync('password', 10),
      permissionLevel: 'ADMIN',
      grade: 'B3 G1',
      bts: false,
      isActive: true
    })
    const user3 = new User({
      firstname: 'Thomas',
      lastname: 'Zimmermann',
      email: 'thomas.zimmermann@epsi.fr',
      password: bcrypt.hashSync('password', 10),
      permissionLevel: 'MEMBER',
      grade: 'B3 G1',
      bts: false,
      isActive: false
    })

    await user1.save()
    logger.info(`=> user1 (${user1.firstname} ${user1.lastname}) saved (${user1._id})`)
    await user2.save()
    logger.info(`=> user2 (${user2.firstname} ${user2.lastname}) saved (${user2._id})`)
    await user3.save()
    logger.info(`=> user3 (${user3.firstname} ${user3.lastname}) saved (${user3._id})`)
  } catch (err) {
    logger.error(err)
  }
}
