const mongoose = require('mongoose')
const assert = require('chai').assert
const Task = require('../../mock/factories/task.factory')

describe('./mock/factories/task.factory', () => {
  // ==================================
  // == constructor
  // ==================================
  describe('constructor', () => {
    describe('with defaults', () => {
      const task = new Task({})

      it('should have an author with type of ObjectID', () => {
        assert.isDefined(task.author)
        assert.isTrue(task.author instanceof mongoose.mongo.ObjectID)
      })

      it('should have a date', () => {
        assert.isDefined(task.date)
      })

      it('should have a type', () => {
        assert.isDefined(task.type)
      })

      it('should have a title', () => {
        assert.isDefined(task.title)
      })

      it('should have a description', () => {
        assert.isDefined(task.description)
      })

      it('should have a subject', () => {
        assert.isDefined(task.subject)
      })

      it('should have a school', () => {
        assert.isDefined(task.school)
      })

      it('should have a city', () => {
        assert.isDefined(task.city)
      })

      it('should have a grade', () => {
        assert.isDefined(task.grade)
      })

      it('should have a group', () => {
        assert.isDefined(task.group)
      })

      it('should have some targets', () => {
        assert.isDefined(task.targets)
        assert.isArray(task.targets)
      })
    })
  })
})
