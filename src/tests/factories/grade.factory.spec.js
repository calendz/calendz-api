const mongoose = require('mongoose')
const assert = require('chai').assert
const Grade = require('../../mock/factories/grade.factory')

describe('./mocl/factories/grade.factory', () => {
  describe('with defaults', () => {
    const grade = new Grade({})

    it('should have a user with type of ObjectID', () => {
      assert.isDefined(grade.user)
      assert.isTrue(grade.user instanceof mongoose.mongo.ObjectID)
    })

    it('should have a value', () => {
      assert.isDefined(grade.value)
    })

    it('should have a coefficient', () => {
      assert.isDefined(grade.coefficient)
    })

    it('should have a subject', () => {
      assert.isDefined(grade.subject)
    })

    it('should have a date', () => {
      assert.isDefined(grade.date)
    })

    it('should have a description', () => {
      assert.isDefined(grade.description)
    })
  })

  describe('with specified properties', () => {
    const userId = mongoose.Types.ObjectId()
    const grade = new Grade({
      user: userId,
      value: 15.5,
      coefficient: 1,
      subject: 'Javascript',
      date: '1598872479',
      description: 'TP morpion'
    })

    it('should have a user with type of ObjectID', () => {
      assert.strictEqual(grade.user, userId)
      assert.isTrue(grade.user instanceof mongoose.mongo.ObjectID)
    })

    it('should have a value', () => {
      assert.strictEqual(grade.value, 15.5)
    })

    it('should have a coefficient', () => {
      assert.strictEqual(grade.coefficient, 1)
    })

    it('should have a subject', () => {
      assert.strictEqual(grade.subject, 'Javascript')
    })

    it('should have a date', () => {
      assert.strictEqual(grade.date, '1598872479')
    })

    it('should have a description', () => {
      assert.strictEqual(grade.description, 'TP morpion')
    })
  })
})
