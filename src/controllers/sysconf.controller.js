const UserService = require('../services/user.service')
const SysconfService = require('../services/sysconf.service')

// get all system settings
exports.getSettings = async (req, res) => {
  const settings = await SysconfService.getSettings()

  return res.status(200).json({
    loginEnabled: settings.loginEnabled,
    registerEnabled: settings.registerEnabled
  })
}

// calculate & return some statistics
exports.getStats = async (req, res) => {
  const _users = await UserService.findAll()

  return res.status(200).json({
    stats: {
      users: {
        total: _users.length,
        inactive: _users.filter(u => !u.isActive).length,
        mailing: _users.filter(u => u.hasInformationMails).length,
        bts: _users.filter(u => u.bts).length,
        activeAccount: {
          lastDay: _users.filter(u => this.isDateEquals(u.lastActiveDate)).length,
          lastThreeDays: _users.filter(u => this.isDateEquals(u.lastActiveDate, 3)).length,
          lastWeek: _users.filter(u => this.isDateEquals(u.lastActiveDate, 7)).length
        },
        creationAccount: {
          lastDay: _users.filter(u => this.isDateEquals(u.creationDate)).length,
          lastThreeDays: _users.filter(u => this.isDateEquals(u.creationDate, 3)).length,
          lastWeek: _users.filter(u => this.isDateEquals(u.creationDate, 7)).length
        }
      },
      grades: {
        b1: _users.filter(u => u.grade === 'B1').length,
        b2: _users.filter(u => u.grade === 'B2').length,
        b3: _users.filter(u => u.grade === 'B3').length,
        i1: _users.filter(u => u.grade === 'I1').length,
        i2: _users.filter(u => u.grade === 'I2').length
      },
      cities: {
        arras: {
          b1: _users.filter(u => u.grade === 'B1' && u.city === 'Arras').length,
          b2: _users.filter(u => u.grade === 'B2' && u.city === 'Arras').length,
          b3: _users.filter(u => u.grade === 'B3' && u.city === 'Arras').length,
          i1: _users.filter(u => u.grade === 'I1' && u.city === 'Arras').length,
          i2: _users.filter(u => u.grade === 'I2' && u.city === 'Arras').length
        },
        auxerre: {
          b1: _users.filter(u => u.grade === 'B1' && u.city === 'Auxerre').length,
          b2: _users.filter(u => u.grade === 'B2' && u.city === 'Auxerre').length,
          b3: _users.filter(u => u.grade === 'B3' && u.city === 'Auxerre').length,
          i1: _users.filter(u => u.grade === 'I1' && u.city === 'Auxerre').length,
          i2: _users.filter(u => u.grade === 'I2' && u.city === 'Auxerre').length
        },
        bordeaux: {
          b1: _users.filter(u => u.grade === 'B1' && u.city === 'Bordeaux').length,
          b2: _users.filter(u => u.grade === 'B2' && u.city === 'Bordeaux').length,
          b3: _users.filter(u => u.grade === 'B3' && u.city === 'Bordeaux').length,
          i1: _users.filter(u => u.grade === 'I1' && u.city === 'Bordeaux').length,
          i2: _users.filter(u => u.grade === 'I2' && u.city === 'Bordeaux').length
        },
        brest: {
          b1: _users.filter(u => u.grade === 'B1' && u.city === 'Brest').length,
          b2: _users.filter(u => u.grade === 'B2' && u.city === 'Brest').length,
          b3: _users.filter(u => u.grade === 'B3' && u.city === 'Brest').length,
          i1: _users.filter(u => u.grade === 'I1' && u.city === 'Brest').length,
          i2: _users.filter(u => u.grade === 'I2' && u.city === 'Brest').length
        },
        grenoble: {
          b1: _users.filter(u => u.grade === 'B1' && u.city === 'Grenoble').length,
          b2: _users.filter(u => u.grade === 'B2' && u.city === 'Grenoble').length,
          b3: _users.filter(u => u.grade === 'B3' && u.city === 'Grenoble').length,
          i1: _users.filter(u => u.grade === 'I1' && u.city === 'Grenoble').length,
          i2: _users.filter(u => u.grade === 'I2' && u.city === 'Grenoble').length
        },
        lille: {
          b1: _users.filter(u => u.grade === 'B1' && u.city === 'Lille').length,
          b2: _users.filter(u => u.grade === 'B2' && u.city === 'Lille').length,
          b3: _users.filter(u => u.grade === 'B3' && u.city === 'Lille').length,
          i1: _users.filter(u => u.grade === 'I1' && u.city === 'Lille').length,
          i2: _users.filter(u => u.grade === 'I2' && u.city === 'Lille').length
        },
        lyon: {
          b1: _users.filter(u => u.grade === 'B1' && u.city === 'Lyon').length,
          b2: _users.filter(u => u.grade === 'B2' && u.city === 'Lyon').length,
          b3: _users.filter(u => u.grade === 'B3' && u.city === 'Lyon').length,
          i1: _users.filter(u => u.grade === 'I1' && u.city === 'Lyon').length,
          i2: _users.filter(u => u.grade === 'I2' && u.city === 'Lyon').length
        },
        montpellier: {
          b1: _users.filter(u => u.grade === 'B1' && u.city === 'Montpellier').length,
          b2: _users.filter(u => u.grade === 'B2' && u.city === 'Montpellier').length,
          b3: _users.filter(u => u.grade === 'B3' && u.city === 'Montpellier').length,
          i1: _users.filter(u => u.grade === 'I1' && u.city === 'Montpellier').length,
          i2: _users.filter(u => u.grade === 'I2' && u.city === 'Montpellier').length
        },
        nantes: {
          b1: _users.filter(u => u.grade === 'B1' && u.city === 'Nantes').length,
          b2: _users.filter(u => u.grade === 'B2' && u.city === 'Nantes').length,
          b3: _users.filter(u => u.grade === 'B3' && u.city === 'Nantes').length,
          i1: _users.filter(u => u.grade === 'I1' && u.city === 'Nantes').length,
          i2: _users.filter(u => u.grade === 'I2' && u.city === 'Nantes').length
        },
        paris: {
          b1: _users.filter(u => u.grade === 'B1' && u.city === 'Paris').length,
          b2: _users.filter(u => u.grade === 'B2' && u.city === 'Paris').length,
          b3: _users.filter(u => u.grade === 'B3' && u.city === 'Paris').length,
          i1: _users.filter(u => u.grade === 'I1' && u.city === 'Paris').length,
          i2: _users.filter(u => u.grade === 'I2' && u.city === 'Paris').length
        },
        dakar: {
          b1: _users.filter(u => u.grade === 'B1' && u.city === 'Dakar').length,
          b2: _users.filter(u => u.grade === 'B2' && u.city === 'Dakar').length,
          b3: _users.filter(u => u.grade === 'B3' && u.city === 'Dakar').length,
          i1: _users.filter(u => u.grade === 'I1' && u.city === 'Dakar').length,
          i2: _users.filter(u => u.grade === 'I2' && u.city === 'Dakar').length
        }
      }
    }
  })
}

exports.isDateEquals = (date, days = 0) => {
  let dateUser = new Date(date * 1000 / 1000)
  dateUser.setHours(0, 0, 0, 0)
  let dateCompare = new Date()

  dateCompare.setDate(dateCompare.getDate() - days)
  dateCompare.setHours(0, 0, 0, 0)

  if (dateUser >= dateCompare) {
    return true
  } else {
    return false
  }
}

// toggle login state
exports.toggleLogin = async (req, res) => {
  const _value = req.params.value
  await SysconfService.updateLoginEnabled(_value)
  return res.status(200).json({})
}

// toggle register state
exports.toggleRegister = async (req, res) => {
  const _value = req.params.value
  await SysconfService.updateRegisterEnabled(_value)
  return res.status(200).json({})
}

// delete all refresh tokens (disconnects all users)
exports.deleteAllRefreshTokens = async (req, res) => {
  await SysconfService.deleteAllRefreshTokens()
  return res.status(200).json({})
}
