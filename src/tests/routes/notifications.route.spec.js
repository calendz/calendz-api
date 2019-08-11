const assert = require('chai').assert
const request = require('supertest')
const app = require('../../app')
const helper = require('../test.helper')

describe('./routes/notifications.route', () => {
  // ===================================================================
  // == GET /api/v1/notifications/:userId - get user's notifications
  // ===================================================================
  describe(`GET /api/v1/notifications/:userId - get user's notifications`, () => {
    helper.requireAuth('get', '/api/v1/notifications/5d4f26aa046ad506f9583bd3')
    helper.requireAdminOrSameUser('get', '/api/v1/notifications/5d4f26aa046ad506f9583bd3')

    it('should fail (404) : user not found', (done) => {
      request(app).get('/api/v1/notifications/5d4f26aa046ad506f9583bc9').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Aucun utilisateur correspondant')
          done()
        })
    })

    it('should success (200) : récupération des notifications', (done) => {
      request(app).get('/api/v1/notifications/5d4f26aa046ad506f9583bd3').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body.notifications)
          assert.isArray(res.body.notifications)
          done()
        })
    })
  })

  // ========================================================================================
  // == PATCH /api/v1/notifications/:userId/read/:notificationId - get user's notifications
  // ========================================================================================
  describe(`PATCH /api/v1/notifications/:userId/read/:notificationId - read a notification`, () => {
    helper.requireAuth('patch', '/api/v1/notifications/5d4f26aa046ad506f9583bd3/read/5d4f26aa246ad506f9583bd1')
    helper.requireAdminOrSameUser('patch', '/api/v1/notifications/5d4f26aa046ad506f9583bd3/read/5d4f26aa246ad506f9583bd1')

    it('should fail (404) : user not found', (done) => {
      request(app).patch('/api/v1/notifications/5d4f26aa046ad506f9583bc9/read/5d4f26aa246ad506f9583bd1').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Aucun utilisateur correspondant')
          done()
        })
    })

    it('should fail (404) : notification not found', (done) => {
      request(app).patch('/api/v1/notifications/5d4f26aa046ad506f9583bd3/read/5d4f26aa246ad506f9583cd1').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Cette notification n'existe pas`)
          done()
        })
    })

    it('should success (200) : notification lue', (done) => {
      request(app).patch('/api/v1/notifications/5d4f26aa046ad506f9583bd3/read/5d4f26aa246ad506f9583bd1').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })
})
