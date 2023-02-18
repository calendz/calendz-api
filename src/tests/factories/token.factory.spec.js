const mongoose = require('mongoose')
const assert = require('chai').assert
const Token = require('../../mock/factories/token.factory')

describe('./mock/factories/token.factory', () => {
  // ==================================
  // == constructor
  // ==================================
  describe('constructor', () => {
    describe('with defaults', () => {
      const token = new Token({})

      it('should have a userId with type of ObjectID', () => {
        assert.isDefined(token.user)
        assert.isTrue(token.user instanceof mongoose.mongo.ObjectID)
      })

      it('should have a value', () => {
        assert.isDefined(token.value)
      })

      it('should have an email', () => {
        assert.isDefined(token.type)
      })
    })

    describe('with specified properties', () => {
      const objectId = mongoose.Types.ObjectId()
      const token = new Token({
        user: objectId,
        value: 'imAValue',
        type: 'EMAIL_VERIFICATION'
      })

      it('should have a userId of type ObjectId', () => {
        assert.strictEqual(token.user, objectId)
        assert.isTrue(token.user instanceof mongoose.mongo.ObjectID)
      })

      it('should have a value', () => {
        assert.strictEqual(token.value, 'imAValue')
      })

      it('should have an email', () => {
        assert.strictEqual(token.type, 'EMAIL_VERIFICATION')
      })
    })
  })
})
