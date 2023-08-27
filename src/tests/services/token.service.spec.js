const assert = require('chai').assert
const uuid = require('crypto');
const mongoose = require('mongoose')
const Token = require('../../models/token.model')
const TokenService = require('../../services/token.service')

describe('./services/token.service', () => {
  const user = mongoose.Types.ObjectId()
  const value = uuid.randomUUID()
  const type = 'EMAIL_VERIFICATION'

  // ===============================================
  // == Methods
  // ===============================================
  describe('#create', () => {
    it('should create a token', (done) => {
      TokenService.create(user, value, type).then((token) => {
        assert.strictEqual(token.user, user)
        assert.strictEqual(token.value, value)
        assert.strictEqual(token.type, type)
        done()
      }, (err) => {
        done(err)
      })
    })
  })

  describe('#deleteOne', () => {
    it('should delete the token', (done) => {
      TokenService.deleteOne(value).then(() => {
        Token.findOne({ value }).then((token) => {
          if (token) {
            done('Shouldn\'t have found this token')
          } else {
            done()
          }
        })
      })
    })
  })
})
