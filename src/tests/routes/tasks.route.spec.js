const assert = require('chai').assert
const request = require('supertest')
const app = require('../../app')

const helper = require('../helpers/test.helper')
const authHelper = require('../helpers/auth.helper')

describe('./routes/tasks.route', () => {
  // ===================================================================
  // == GET /v1/notifications/:userId - get user's notifications
  // ===================================================================
  describe(`GET /v1/notifications/:userId - get user's notifications`, () => {
    authHelper.requireAuth('get', '/v1/tasks/5d4f26aa046ad506f9583bd3')
    authHelper.requireAdminOrSameUser('get', '/v1/tasks/5d4f26aa046ad506f9583bd3')

    it('should fail (404) : user not found', (done) => {
      request(app).get('/v1/tasks/5d4f26aa046ad506f9583bc9').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Aucun utilisateur correspondant')
          done()
        })
    })

    it('should fail (422) : ID is not an ObjectID', (done) => {
      request(app).get('/v1/tasks/azeazeaze').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `ID is not a valid ObjectID`)
          done()
        })
    })

    it('should success (200) : récupération des tâches', (done) => {
      request(app).get('/v1/tasks/5d4f26aa046ad506f9583bd3').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body.tasks)
          assert.isArray(res.body.tasks)
          done()
        })
    })
  })
})
