const assert = require('chai').assert
const mongoose = require('mongoose')
const GradesService = require('../../services/grades.service')

describe('./services/grades.service', () => {
  const user = '5d4f26aa046ad506f9583bd3'
  const value = 19.5
  const coefficient = 2
  const subject = 'Anglais'
  const date = '1590357528'
  const description = 'DS fait en cours'
  let gradeId

  // ===============================================
  // == Methods
  // ===============================================

  describe('#create', () => {
    it('should create a grade', (done) => {
      GradesService.create(user, value, coefficient, subject, date, description).then(grade => {
        assert.strictEqual(grade.value, value)
        assert.strictEqual(grade.coefficient, coefficient)
        assert.strictEqual(grade.subject, subject)
        assert.strictEqual(grade.date, date.toString())
        assert.strictEqual(grade.description, description)
        assert.isTrue(grade._id instanceof mongoose.mongo.ObjectID)
        assert.isTrue(grade.user instanceof mongoose.mongo.ObjectID)
        gradeId = grade._id
        done()
      }).catch(err => done(err))
    })
  })

  describe('#findOne', () => {
    it('should get a grade by its id', (done) => {
      GradesService.findOne({ _id: gradeId }).then(grade => {
        assert.strictEqual(grade.value, value)
        assert.strictEqual(grade.coefficient, coefficient)
        assert.strictEqual(grade.subject, subject)
        assert.strictEqual(grade.date, date)
        assert.strictEqual(grade.description, description)
        assert.isTrue(grade._id instanceof mongoose.mongo.ObjectID)
        assert.isTrue(grade.user instanceof mongoose.mongo.ObjectID)
        done()
      })
    })
  })

  describe('#getAllFrom', () => {
    it('should get grades of user', (done) => {
      GradesService.getAllFrom(user).then(grades => {
        assert.isDefined(grades)
        assert.isArray(grades)
        done()
      }).catch(err => done(err))
    })
  })

  describe('#modify', () => {
    it('should modify a grade', (done) => {
      GradesService.modify(gradeId, user, 0.5, coefficient, date, 'Une nouvelle description').then(grade => {
        assert.strictEqual(grade.value, 0.5)
        assert.strictEqual(grade.coefficient, coefficient)
        assert.strictEqual(grade.date, date.toString())
        assert.strictEqual(grade.description, 'Une nouvelle description')
        assert.isTrue(grade._id instanceof mongoose.mongo.ObjectID)
        assert.isTrue(grade.user instanceof mongoose.mongo.ObjectID)
        done()
      }).catch(err => done(err))
    })
  })

  describe('#delete', () => {
    it('should delete a task', (done) => {
      GradesService.delete(gradeId).then(() => {
        done()
      }).catch(err => done(err))
    })
  })
})
