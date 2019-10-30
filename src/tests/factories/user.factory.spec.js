const assert = require('chai').assert
const User = require('../../mock/factories/user.factory')

describe('./mock/factories/user.factory', () => {
  // ==================================
  // == constructor
  // ==================================
  describe('constructor', () => {
    describe('with defaults', () => {
      const user = new User({})

      it('should have a firstname', () => {
        assert.isDefined(user.firstname)
      })

      it('should have a lastname', () => {
        assert.isDefined(user.lastname)
      })

      it('should have an email', () => {
        assert.isDefined(user.email)
      })

      it('should have a password', () => {
        assert.isDefined(user.password)
      })

      it('should have an avatarUrl', () => {
        assert.isDefined(user.avatarUrl)
      })

      it('should have a grade', () => {
        assert.isDefined(user.grade)
      })

      it('should have a group', () => {
        assert.isDefined(user.group)
      })

      it('should have a city', () => {
        assert.isDefined(user.city)
      })

      it('should have a bts', () => {
        assert.isDefined(user.bts)
      })

      it('should have a permissionLevel', () => {
        assert.isDefined(user.permissionLevel)
      })

      it('should have a isActive', () => {
        assert.isDefined(user.isActive)
      })

      it('should have a hasInformationMails', () => {
        assert.isDefined(user.hasInformationMails)
      })

      it('should have a creationDate', () => {
        assert.isDefined(user.creationDate)
      })

      it('should have a lastActiveDate', () => {
        assert.isDefined(user.lastActiveDate)
      })

      it('should have a settings.calendarColor', () => {
        assert.isDefined(user.settings.calendarColor)
      })
    })

    describe('with specified properties', () => {
      const user = new User({
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@epsi.fr',
        password: 'password',
        avatarUrl: 'https://cdn.discordapp.com/avatars/255065617705467912/b4b7413f8c24e7a5f5fcdee5c2f626da.png?size=2048',
        grade: 'B1',
        group: 'G1',
        city: 'Lyon',
        bts: true,
        permissionLevel: 'MEMBER',
        isActive: true,
        hasInformationMails: false,
        creationDate: '1565791447',
        lastActiveDate: '1565494877',
        settings: {
          calendarColor: '47a8a2'
        }
      })

      it('should have a firstname', () => {
        assert.strictEqual(user.firstname, 'John')
      })

      it('should have a lastname', () => {
        assert.strictEqual(user.lastname, 'Doe')
      })

      it('should have an email', () => {
        assert.strictEqual(user.email, 'john.doe@epsi.fr')
      })

      it('should have a password', () => {
        assert.strictEqual(user.password, 'password')
      })

      it('should have an avatarUrl', () => {
        assert.strictEqual(user.avatarUrl, 'https://cdn.discordapp.com/avatars/255065617705467912/b4b7413f8c24e7a5f5fcdee5c2f626da.png?size=2048')
      })

      it('should have a grade', () => {
        assert.strictEqual(user.grade, 'B1')
      })

      it('should have a group', () => {
        assert.strictEqual(user.group, 'G1')
      })

      it('should have a city', () => {
        assert.strictEqual(user.city, 'Lyon')
      })

      it('should have a bts', () => {
        assert.strictEqual(user.bts, true)
      })

      it('should have a permissionLevel', () => {
        assert.strictEqual(user.permissionLevel, 'MEMBER')
      })

      it('should have a isActive', () => {
        assert.strictEqual(user.isActive, true)
      })

      it('should have a hasInformationMails', () => {
        assert.strictEqual(user.hasInformationMails, false)
      })

      it('should have a creationDate', () => {
        assert.strictEqual(user.creationDate, '1565791447')
      })

      it('should have a lastActiveDate', () => {
        assert.strictEqual(user.lastActiveDate, '1565494877')
      })

      it('should have a settings.calendarColor', () => {
        assert.strictEqual(user.settings.calendarColor, '47a8a2')
      })
    })
  })
})
