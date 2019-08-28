const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const config = require('../../config/config')
const JwtService = require('../../services/jwt.service')

describe('./services/jwt.service', () => {
  const user = {
    _id: mongoose.Types.ObjectId(),
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@epsi.fr',
    permissionLevel: 'MEMBER'
  }

  // ===============================================
  // == Methods
  // ===============================================
  describe('#createAccess', () => {
    it('should create an access token', (done) => {
      const token = JwtService.createAccess(user, true)
      try {
        jwt.verify(token, config.jwt.secret)
        done()
      } catch (err) {
        done(err)
      }
    })
  })

  describe('#createRefresh', () => {
    it('should create a refresh token', (done) => {
      JwtService.createRefresh(user, false).then((token) => {
        try {
          jwt.verify(token, config.jwt.secret)
          done()
        } catch (err) {
          done(err)
        }
      })
    })
  })
})
