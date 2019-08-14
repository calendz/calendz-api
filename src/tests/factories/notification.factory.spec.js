const mongoose = require('mongoose')
const assert = require('chai').assert
const Notification = require('../../mock/factories/notification.factory')

describe('./mock/factories/notification.factory', () => {
  // ==================================
  // == constructor
  // ==================================
  describe('constructor', () => {
    describe('with defaults', () => {
      const notification = new Notification({})

      it('should have a user with type of ObjectID', () => {
        assert.isDefined(notification.user)
        assert.isTrue(notification.user instanceof mongoose.mongo.ObjectID)
      })

      it('should have a title', () => {
        assert.isDefined(notification.title)
      })

      it('should have a message', () => {
        assert.isDefined(notification.message)
      })

      it('should have an icon', () => {
        assert.isDefined(notification.icon)
      })

      it('should have a timestamp', () => {
        assert.isDefined(notification.timestamp)
      })

      it('should have a isRead', () => {
        assert.isDefined(notification.isRead)
      })
    })

    describe('with specified properties', () => {
      const objectId = mongoose.Types.ObjectId()
      const notification = new Notification({
        user: objectId,
        title: 'TEST123',
        message: 'TESTMESSAGE123',
        icon: 'an-icon',
        timestamp: '1565791447',
        isRead: true
      })

      it('should have a user of type ObjectId', () => {
        assert.strictEqual(notification.user, objectId)
        assert.isTrue(notification.user instanceof mongoose.mongo.ObjectID)
      })

      it('should have a title', () => {
        assert.strictEqual(notification.title, 'TEST123')
      })

      it('should have a message', () => {
        assert.strictEqual(notification.message, 'TESTMESSAGE123')
      })

      it('should have an icon', () => {
        assert.strictEqual(notification.icon, 'an-icon')
      })

      it('should have a timestamp', () => {
        assert.strictEqual(notification.timestamp, '1565791447')
      })

      it('should have a isRead', () => {
        assert.strictEqual(notification.isRead, true)
      })
    })
  })
})
