const request = require('supertest')
const app = require('../../app')

const helper = require('./test.helper')

module.exports = {
  // ==========================================
  // == Require user to be authenticated
  // ==========================================
  userNotFound: (method, route, body = {}) => {
    it('should fail (404) : user not found', (done) => {
      switch (method) {
        case 'get':
          request(app).get(route).set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
              if (err) return done(err)
              helper.hasBodyMessage(res.body, 'Aucun utilisateur correspondant')
              done()
            })
          break
        case 'post':
          request(app).post(route).set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
            .send(body)
            .expect(404)
            .end((err, res) => {
              if (err) return done(err)
              helper.hasBodyMessage(res.body, 'Aucun utilisateur correspondant')
              done()
            })
          break
        case 'patch':
          request(app).patch(route).set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
            .send(body)
            .expect(404)
            .end((err, res) => {
              if (err) return done(err)
              helper.hasBodyMessage(res.body, 'Aucun utilisateur correspondant')
              done()
            })
          break
        case 'delete':
          request(app).delete(route).set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
              if (err) return done(err)
              helper.hasBodyMessage(res.body, 'Aucun utilisateur correspondant')
              done()
            })
          break
      }
    })
  }
}
