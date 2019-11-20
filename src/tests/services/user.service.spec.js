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
  const grade = 'B1'
  const group = 'G1'
  const city = 'Lyon'
  let userId
  const taskId = '5d4f26aa046bc506f9983ad3'

  // ===============================================
  // == Methods
  // ===============================================
  describe('#create', () => {
    it('should create a user', (done) => {
      UserService.create(firstname, lastname, email, password, grade, group, city).then((user) => {
        assert.strictEqual(user.firstname, firstname)
        assert.strictEqual(user.lastname, lastname)
        assert.strictEqual(user.email, email)
        assert.strictEqual(user.school, 'EPSI')
        assert.strictEqual(user.grade, grade)
        assert.strictEqual(user.group, group)
        assert.strictEqual(user.city, city)
        assert.isTrue(user._id instanceof mongoose.mongo.ObjectID)
        userId = user._id
        done()
      }, (err) => {
        done(err)
      })
    })

    it('should create a user (wis)', (done) => {
      UserService.create(firstname, lastname, 'john.doe@wis.fr', password, grade, group, city).then((user) => {
        assert.strictEqual(user.firstname, firstname)
        assert.strictEqual(user.lastname, lastname)
        assert.strictEqual(user.email, 'john.doe@wis.fr')
        assert.strictEqual(user.school, 'WIS')
        assert.strictEqual(user.grade, grade)
        assert.strictEqual(user.group, group)
        assert.strictEqual(user.city, city)
        assert.isTrue(user._id instanceof mongoose.mongo.ObjectID)
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
        assert.strictEqual(user.group, group)
        assert.strictEqual(user.city, city)
        done()
      })
    })
  })

  describe('#findAll', () => {
    it('should get all users', (done) => {
      UserService.findAll().then((users) => {
        assert.isDefined(users)
        assert.isArray(users)
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

  describe('#setBts', () => {
    it('should set user\'s bts to true', (done) => {
      UserService.setBts(userId, true).then(() => {
        User.findById(userId).then((user) => {
          assert.isTrue(user.bts)
          done()
        })
      })
    })

    it('should set user\'s bts to false', (done) => {
      UserService.setBts(userId, false).then(() => {
        User.findById(userId).then((user) => {
          assert.isFalse(user.bts)
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

  describe('#setInformationMails', () => {
    it('should set hasInformationMails to true', (done) => {
      UserService.setInformationMails(userId, true).then(() => {
        User.findById(userId).then((user) => {
          assert.isTrue(user.hasInformationMails)
          done()
        })
      })
    })

    it('should set hasInformationMails to false', (done) => {
      UserService.setInformationMails(userId, false).then(() => {
        User.findById(userId).then((user) => {
          assert.isFalse(user.hasInformationMails)
          done()
        })
      })
    })
  })

  describe('#setMailTaskCreate', () => {
    it('should set setings.mail.taskCreate to true', (done) => {
      UserService.setMailTaskCreate(userId, true).then(() => {
        User.findById(userId).then((user) => {
          assert.isTrue(user.settings.mail.taskCreate)
          done()
        })
      })
    })

    it('should set hasInformationMails to false', (done) => {
      UserService.setMailTaskCreate(userId, false).then(() => {
        User.findById(userId).then((user) => {
          assert.isFalse(user.settings.mail.taskCreate)
          done()
        })
      })
    })
  })

  describe('#setCalendarColor', () => {
    it('should change calendar color', (done) => {
      UserService.setCalendarColor(userId, 'b23ce4').then(() => {
        User.findById(userId).then((user) => {
          assert.strictEqual(user.settings.calendarColor, 'b23ce4')
          done()
        })
      })
    })
  })

  describe('#setAvatar', () => {
    it('should change user avatar', (done) => {
      UserService.setAvatar(userId, 'https://cdn.discordapp.com/avatars/255065617705467912/b4b7413f8c24e7a5f5fcdee5c2f626da.png?size=2048').then(() => {
        User.findById(userId).then((user) => {
          assert.strictEqual(user.avatarUrl, 'https://cdn.discordapp.com/avatars/255065617705467912/b4b7413f8c24e7a5f5fcdee5c2f626da.png?size=2048')
          done()
        })
      })
    })
  })

  describe('#updateUserInformations', () => {
    it('should update user\'s informations', done => {
      UserService.updateUserInformations(userId, 'test_firstname', 'test_lastname', 'test.email@epsi.fr', 'MEMBER', 'B1', 'G2', 'Paris', true, true).then(() => {
        User.findById(userId).then(user => {
          assert.strictEqual(user.firstname, 'test_firstname')
          assert.strictEqual(user.lastname, 'test_lastname')
          assert.strictEqual(user.email, 'test.email@epsi.fr')
          assert.strictEqual(user.permissionLevel, 'MEMBER')
          assert.strictEqual(user.grade, 'B1')
          assert.strictEqual(user.group, 'G2')
          assert.strictEqual(user.city, 'Paris')
          assert.strictEqual(user.isActive, true)
          assert.strictEqual(user.bts, true)
          done()
        })
      })
    })
  })

  describe('#updateLastActiveDate', () => {
    it(`should update user's last active date`, done => {
      UserService.updateLastActiveDate(userId).then(() => {
        User.findById(userId).then(user => {
          assert.isTrue(user.lastActiveDate < Date.now())
          done()
        })
      })
    })
  })

  describe('#setTaskDone', () => {
    it(`should add task to done tasks`, done => {
      UserService.setTaskDone(userId, taskId).then(() => {
        User.findById(userId).then(user => {
          assert.include(user.tasks.done, '5d4f26aa046bc506f9983ad3')
          done()
        })
      })
    })
  })

  describe('#setTaskNotDone', () => {
    it(`should remove task from done tasks`, done => {
      UserService.setTaskNotDone(userId, taskId).then(() => {
        User.findById(userId).then(user => {
          assert.notInclude(user.tasks.done, '5d4f26aa046bc506f9983ad3')
          done()
        })
      })
    })
  })
})
