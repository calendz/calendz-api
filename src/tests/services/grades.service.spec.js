const assert = require('chai').assert
const mongoose = require('mongoose')
const GradesService = require('../../services/grades.service')

describe('./services/grades.service', () => {
  const user = '5d4f26aa046ad506f9583bd3'

  // ===============================================
  // == Methods
  // ===============================================

  describe('#findOne', () => {
    it('should get a grade by its id', (done) => {
      // from seedData
      const gradeId = '1b2c45bb352ad495f9583bd3'
      GradesService.findOne({ _id: gradeId }).then(grade => {
        assert.strictEqual(grade.value, 19.5)
        assert.strictEqual(grade.coefficient, 2)
        assert.strictEqual(grade.subject, 'Anglais')
        assert.strictEqual(grade.date, '1590357529')
        assert.strictEqual(grade.description, 'DS fait en cours')
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
})
