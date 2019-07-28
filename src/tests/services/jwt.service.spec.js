const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const config = require('../../config/config')
const JwtService = require('../../services/jwt.service')

describe('./services/jwt.service', () => {
  const user = {
    userId: mongoose.Types.ObjectId(),
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@epsi.fr',
    permissionLevel: 'MEMBER'
  }

  // ===============================================
  // == Methods
  // ===============================================
  describe('#create', () => {
    it('should create a token with rememberMe', (done) => {
      JwtService.create(user, true).then((token) => {
        jwt.verify(token, config.jwt.secret)
        done()
      })
    })

    it('should create a token without rememberMe', (done) => {
      JwtService.create(user, false).then((token) => {
        jwt.verify(token, config.jwt.secret)
        done()
      })
    })
  })
})
