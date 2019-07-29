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
      const token = JwtService.create(user, true)
      try {
        jwt.verify(token, config.jwt.secret)
        done()
      } catch (err) {
        done(err)
      }
    })

    it('should create a token without rememberMe', (done) => {
      const token = JwtService.create(user, false)
      try {
        jwt.verify(token, config.jwt.secret)
        done()
      } catch (err) {
        done(err)
      }
    })
  })
})
