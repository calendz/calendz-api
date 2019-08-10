/* istanbul ignore file */
const bcrypt = require('bcryptjs')
const config = require('../config/config')
const logger = require('../config/winston')
const initMongo = require('../config/mongoose')

const UserModel = require('../models/user.model')
const TokenModel = require('../models/token.model')
const RefreshModel = require('../models/refresh.model')
const NotificationModel = require('../models/notification.model')

const User = require('../mock/factories/user.factory')
const Token = require('../mock/factories/token.factory')

if (config.node_env === 'mock') {
  initMongo(async () => {
    // 2nd: if needed: populate db w/ fake dataset
    if (config.populate) {
      logger.warn('POPULATE: started dataset')
      await this.removeAllData().then(async () => {
        await this.seedData().then(() => {
          logger.warn('POPULATE: dataset completed')
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
    await UserModel.deleteMany({})
    await TokenModel.deleteMany({})
    await RefreshModel.deleteMany({})
    await NotificationModel.deleteMany({})
    logger.warn('POPULATE: successfully removed all data')
  } catch (err) {
    logger.error(err)
  }
}

// ===================================
// == add data
// ===================================
module.exports.seedData = async function seedData () {
  try {
    const user1 = new UserModel({
      _id: '5d45c90b0a7827069971e116',
      firstname: 'Arthur',
      lastname: 'Dufour',
      email: 'arthur.dufour1@epsi.fr',
      password: bcrypt.hashSync('password', 10),
      permissionLevel: 'MEMBER',
      grade: 'B3 G1',
      bts: false,
      isActive: true
    })
    await user1.save()

    const user2 = new UserModel({
      _id: '5d4f26aa046ad506f9583bd3',
      firstname: 'Alexandre',
      lastname: 'Tuet',
      email: 'alexandre.tuet1@epsi.fr',
      password: bcrypt.hashSync('password', 10),
      permissionLevel: 'ADMIN',
      grade: 'B3 G1',
      bts: false,
      isActive: true
    })
    await user2.save()

    const user3 = new UserModel({
      firstname: 'Thomas',
      lastname: 'Zimmermann',
      email: 'thomas.zimmermann@epsi.fr',
      password: bcrypt.hashSync('password', 10),
      permissionLevel: 'MEMBER',
      grade: 'B3 G1',
      bts: false,
      isActive: false
    })
    await user3.save()

    const token1 = new TokenModel({
      user: user3._id,
      value: 'aValidToken',
      type: 'EMAIL_VERIFICATION'
    })
    await token1.save()

    const token2 = new TokenModel({
      user: user2._id,
      value: 'aValidToken2',
      type: 'PASSWORD_RESET'
    })
    await token2.save()

    const token3 = new TokenModel({
      user: user2._id,
      value: 'aValidToken3',
      type: 'EMAIL_VERIFICATION'
    })
    await token3.save()

    const refreshToken = new RefreshModel({
      user: '5d45c90b0a7827069971e116',
      value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDQ1YzkwYjBhNzgyNzA2OTk3MWUxMTYiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXIxQGVwc2kuZnIiLCJwZXJtaXNzaW9uTGV2ZWwiOiJNRU1CRVIiLCJmaXJzdG5hbWUiOiJBcnRodXIiLCJsYXN0bmFtZSI6IkR1Zm91ciIsInJlbWVtYmVyTWUiOnRydWUsImlhdCI6MTU2NTM2NjMxMCwiZXhwIjoyNjA3NjUzNjYzMTB9.5yb5fhF3jfTXwudWMbBjXNCW8CWnzAUsNG_i14IJdDU'
    })
    await refreshToken.save()

    const notification1 = new NotificationModel({
      user: user1._id,
      title: 'Test',
      message: 'Ceci est une notification de test !'
    })
    await notification1.save()

    const notification2 = new NotificationModel({
      user: user2._id,
      title: 'Encore un test',
      message: 'Une notre notification automatiquement générée à des fins de tests.'
    })
    await notification2.save()

    const notification3 = new NotificationModel({
      user: user2._id,
      title: 'Hello ' + user2._id,
      message: 'Do fugiat occaecat irure sunt labore qui nulla laborum in culpa adipisicing labore consectetur fugiat.'
    })
    await notification3.save()

    await UserModel.insertMany(generateUsers(200))
    await TokenModel.insertMany(generateTokens(200))
  } catch (err) {
    logger.error(err)
  }
}

function generateUsers (amount) {
  const array = []
  for (let i = 0; i < amount; i++) {
    array.push(new User({}))
  }
  return array
}

function generateTokens (amount) {
  const array = []
  for (let i = 0; i < amount; i++) {
    array.push(new Token({}))
  }
  return array
}
