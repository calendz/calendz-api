const assert = require('chai').assert
const mongoose = require('mongoose')
const TasksService = require('../../services/tasks.service')

describe('./services/tasks.service', () => {
  const user = '5d4f26aa046ad506f9583bd3'
  const date = new Date().getTime()
  const type = 'task'
  const title = 'Un titre de tâche'
  const description = 'Description de ma tâche de test'
  const subject = 'Une matière'
  const city = 'Lyon'
  const grade = 'B3'
  const group = 'G1 (dev)'
  const targets = []
  let taskId

  // ===============================================
  // == Methods
  // ===============================================

  describe('#getAllFrom', () => {
    it('should get notifications of user', (done) => {
      TasksService.getAllFrom(user).then(tasks => {
        assert.isDefined(tasks)
        assert.isArray(tasks)
        done()
      }).catch(err => done(err))
    })
  })

  describe('#create', () => {
    it('should create a task', (done) => {
      TasksService.create(user, date, type, title, description, subject, city, grade, group, targets).then(task => {
        assert.isTrue(task._id instanceof mongoose.mongo.ObjectID)
        assert.isTrue(task.author._id instanceof mongoose.mongo.ObjectID)
        assert.strictEqual(task.date, date.toString())
        assert.strictEqual(task.type, type)
        assert.strictEqual(task.title, title)
        assert.strictEqual(task.description, description)
        assert.strictEqual(task.subject, subject)
        assert.strictEqual(task.city, city)
        assert.strictEqual(task.grade, grade)
        assert.strictEqual(task.group, group)
        assert.isArray(task.targets)
        taskId = task._id
        done()
      }).catch(err => done(err))
    })
  })

  describe('#modify', () => {
    it('should modify a task', (done) => {
      TasksService.modify(taskId, 'Some new title', type, subject, date, description).then(task => {
        assert.isTrue(task._id instanceof mongoose.mongo.ObjectID)
        assert.isTrue(task.author._id instanceof mongoose.mongo.ObjectID)
        assert.strictEqual(task.date, date.toString())
        assert.strictEqual(task.type, type)
        assert.strictEqual(task.title, 'Some new title')
        assert.strictEqual(task.description, description)
        assert.strictEqual(task.subject, subject)
        assert.strictEqual(task.city, city)
        assert.strictEqual(task.grade, grade)
        assert.strictEqual(task.group, group)
        assert.isArray(task.targets)
        taskId = task._id
        done()
      }).catch(err => done(err))
    })
  })

  describe('#delete', () => {
    it('should delete a task', (done) => {
      TasksService.delete(taskId).then(() => {
        done()
      }).catch(err => done(err))
    })
  })
})
