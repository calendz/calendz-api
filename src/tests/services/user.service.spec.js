const assert = require('chai').assert
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../../models/user.model')
const UserService = require('../../services/user.service')

describe('./services/user.service', () => {
  const firstname = 'John'
  const lastname = 'Doe'
  const email = 'john.doe123@epsi.fr'
  const password = 'password'
  const grade = 'B1 G1'
  let userId

  // ===============================================
  // == Methods
  // ===============================================
  describe('#create', () => {
    it('should create a user', (done) => {
      UserService.create(firstname, lastname, email, password, grade).then((user) => {
        assert.strictEqual(user.firstname, firstname)
        assert.strictEqual(user.lastname, lastname)
        assert.strictEqual(user.email, email)
        assert.strictEqual(user.grade, grade)
        assert.isTrue(user._id instanceof mongoose.mongo.ObjectID)
        userId = user._id
        done()
      }, (err) => {
        done(err)
      })
    })
  })

  describe('#findOne', () => {
    it('should get user by its id', (done) => {
      UserService.findOne({ _id: userId }).then((user) => {
        assert.isDefined(user._id)
        assert.isUndefined(user.password)
        assert.strictEqual(user.firstname, firstname)
        assert.strictEqual(user.lastname, lastname)
        assert.strictEqual(user.email, email)
        assert.strictEqual(user.grade, grade)
        done()
      })
    })
  })

  describe('#setActive', () => {
    it('should set user.active to true', (done) => {
      UserService.setActive(userId, true).then(() => {
        User.findById(userId).then((user) => {
          assert.isTrue(user.isActive)
          done()
        })
      })
    })

    it('should set user.active to false', (done) => {
      UserService.setActive(userId, false).then(() => {
        User.findById(userId).then((user) => {
          assert.isFalse(user.isActive)
          done()
        })
      })
    })
  })

  describe('#setPassword', () => {
    it('should change user\'s password', (done) => {
      UserService.setPassword(userId, 'newPassword').then(() => {
        User.findById(userId).then((user) => {
          assert.isTrue(bcrypt.compareSync('newPassword', user.password))
          done()
        })
      })
    })
  })
})
