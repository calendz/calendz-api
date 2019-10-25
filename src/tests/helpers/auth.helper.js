const request = require('supertest')
const app = require('../../app')

const helper = require('./test.helper')

module.exports = {
  // ==========================================
  // == Require user to be authenticated
  // ==========================================
  requireAuth: (method, route, body = {}) => {
    it('should fail (401) : not authenticated', (done) => {
      switch (method) {
        case 'get':
          request(app).get(route).set(helper.defaultSets).expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
          break
        case 'post':
          request(app).post(route).set(helper.defaultSets).expect('Content-Type', /json/)
            .send(body)
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
          break
        case 'patch':
          request(app).patch(route).set(helper.defaultSets).expect('Content-Type', /json/)
            .send(body)
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
          break
        case 'delete':
          request(app).delete(route).set(helper.defaultSets).expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
          break
      }
    })
  },

  // ==========================================
  // == Require user to have admin role
  // ==========================================
  requireAdmin: (method, route, body = {}) => {
    it('should fail (403) : not admin', (done) => {
      switch (method) {
        case 'get':
          request(app).get(route).set(helper.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
            .expect(403)
            .end((err, res) => {
              if (err) return done(err)
              helper.hasBodyMessage(res.body, `Vous n'avez pas la permission d'effectuer cela`)
              done()
            })
          break
        case 'post':
          request(app).post(route).set(helper.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
            .send(body)
            .expect(403)
            .end((err, res) => {
              if (err) return done(err)
              helper.hasBodyMessage(res.body, `Vous n'avez pas la permission d'effectuer cela`)
              done()
            })
          break
        case 'patch':
          request(app).patch(route).set(helper.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
            .send(body)
            .expect(403)
            .end((err, res) => {
              if (err) return done(err)
              helper.hasBodyMessage(res.body, `Vous n'avez pas la permission d'effectuer cela`)
              done()
            })
          break
        case 'delete':
          request(app).delete(route).set(helper.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
            .expect(403)
            .end((err, res) => {
              if (err) return done(err)
              helper.hasBodyMessage(res.body, `Vous n'avez pas la permission d'effectuer cela`)
              done()
            })
          break
      }
    })
  },

  // ==========================================
  // == Require user to have admin role or
  // == to be the user who is authenticated
  // ==========================================
  requireAdminOrSameUser: (method, route, body = {}, successStatus = 200) => {
    it('should fail (403) : wrong user & not admin', (done) => {
      switch (method) {
        case 'get':
          request(app).get(route).set(helper.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
            .expect(403)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
          break
        case 'patch':
          request(app).patch(route).set(helper.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
            .send(body)
            .expect(403)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
      }
    })

    it('should success (200) : same user', (done) => {
      switch (method) {
        case 'get':
          request(app).get(route).set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
          break
        case 'patch':
          request(app).patch(route).set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
            .send(body)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
          break
      }
    })

    it('should success (200) : admin', (done) => {
      switch (method) {
        case 'get':
          request(app).get(route).set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
          break
        case 'patch':
          request(app).patch(route).set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
            .send(body)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
          break
      }
    })
  }
}
