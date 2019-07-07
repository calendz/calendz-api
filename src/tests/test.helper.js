const assert = require('chai').assert
const request = require('supertest')
const app = require('../app')

module.exports = {
  // ===========================================
  // == helper functions
  // ===========================================
  hasBodyMessage (body, message) {
    assert.isString(body.message)
    assert.property(body, 'message')
    assert.propertyVal(body, 'message', message)
  },

  hasBodyErrors (body) {
    assert.property(body, 'errors')
    assert.isArray(body.errors)
  },

  hasBodyErrorsThatContains (body, message) {
    this.hasBodyErrors(body)
    assert.isNotEmpty(body.errors)
    assert.include(body.errors, message)
  },

  defaultSets: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  defaultSetsWithAuth: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ????????' // TODO:
  },

  // ===========================================
  // == whole feature functions
  // ===========================================
  testAuthentication (route) {
    it.skip('should fail (401) : authentication required', (done) => {
      request(app).get(route).set(this.defaultSets).expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          this.hasBodyMessage(res.body, 'Authentication required')
          done()
        })
    })

    it.skip('should fail (400) : invalid token', (done) => {
      request(app).get(route).set(this.defaultSets).expect('Content-Type', /json/)
        .set('Authorization', 'Bearer notAToken')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err)
          this.hasBodyMessage(res.body, 'Invalid token')
          done()
        })
    })
  }
}
