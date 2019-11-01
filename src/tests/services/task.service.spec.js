const assert = require('chai').assert
const TasksService = require('../../services/tasks.service')

describe('./services/tasks.service', () => {
  const user = '5d4f26aa046ad506f9583bd3'

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
})
