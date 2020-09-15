const assert = require('chai').assert
const User = require('../../models/user.model')
const Refresh = require('../../models/refresh.model')
const Sysconf = require('../../models/sysconf.model')
const SysconfService = require('../../services/sysconf.service')
const UserService = require('../../services/user.service')

describe('./services/sysconf.service', () => {
  // ===============================================
  // == Methods
  // ===============================================
  describe('#getMailRecipients', () => {
    it(`should get emails from all eligible users`, done => {
      User.findOneAndUpdate({ email: 'elbert.hermiston@epsi.fr' }, { isMigrated: true }).then(() => {
        SysconfService.getMailRecipients().then(users => {
          assert.notInclude(users, 'lambert.ondricka@epsi.fr')
          assert.notInclude(users, 'madalyn.schroeder@ecoles-wis.net')
          assert.include(users, 'elbert.hermiston@epsi.fr')
          done()
        })
      })
    })
  })

  describe('#initSettings', () => {
    it('should initialize all settings', (done) => {
      SysconfService.initSettings().then(async () => {
        const system = await Sysconf.findOne({ env: 'production' })
        assert.strictEqual(system.env, 'production')
        assert.strictEqual(system.settings.loginEnabled, true)
        assert.strictEqual(system.settings.registerEnabled, true)
        done()
      }, (err) => {
        done(err)
      })
    })
  })

  describe('#updateLoginEnabled', () => {
    it('should set loginEnabled to false', (done) => {
      SysconfService.updateLoginEnabled(false).then(async () => {
        const system = await Sysconf.findOne({ env: 'production' })
        assert.strictEqual(system.settings.loginEnabled, false)
        done()
      }, (err) => {
        done(err)
      })
    })

    it('should set loginEnabled to true', (done) => {
      SysconfService.updateLoginEnabled(true).then(async () => {
        const system = await Sysconf.findOne({ env: 'production' })
        assert.strictEqual(system.settings.loginEnabled, true)
        done()
      }, (err) => {
        done(err)
      })
    })
  })

  describe('#updateRegisterEnabled', () => {
    it('should set registerEnabled to false', (done) => {
      SysconfService.updateRegisterEnabled(false).then(async () => {
        const system = await Sysconf.findOne({ env: 'production' })
        assert.strictEqual(system.settings.registerEnabled, false)
        done()
      }, (err) => {
        done(err)
      })
    })

    it('should set registerEnabled to true', (done) => {
      SysconfService.updateRegisterEnabled(true).then(async () => {
        const system = await Sysconf.findOne({ env: 'production' })
        assert.strictEqual(system.settings.loginEnabled, true)
        done()
      }, (err) => {
        done(err)
      })
    })
  })

  describe('#deleteAllRefreshTokens', () => {
    it('should delete all refresh tokens', (done) => {
      SysconfService.deleteAllRefreshTokens().then(async () => {
        const refreshes = await Refresh.find({})
        assert.isEmpty(refreshes)
        done()
      }, (err) => {
        done(err)
      })
    })
  })

  describe('#migrateAllAccounts', () => {
    it('should set all accounts to isMigrated false', (done) => {
      SysconfService.migrateAllAccounts().then(async () => {
        const alexandre = await UserService.findOne({ email: 'alexandre.tuet@epsi.fr' })
        assert.strictEqual(alexandre.isMigrated, false)
        done()
      }, (err) => {
        done(err)
      })
    })
  })

  // ===============================================
  // == Getters
  // ===============================================
  describe('#getSettings', () => {
    it('should return settings', (done) => {
      SysconfService.getSettings().then(settings => {
        assert.isDefined(settings)
        assert.isDefined(settings.loginEnabled)
        assert.isDefined(settings.registerEnabled)
        done()
      }, (err) => {
        done(err)
      })
    })
  })
})
