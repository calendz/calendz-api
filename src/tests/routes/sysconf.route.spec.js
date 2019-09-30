const assert = require('chai').assert
const request = require('supertest')
const app = require('../../app')
const helper = require('../test.helper')
// const Sysconf = require('../../models/sysconf.model')

describe('./routes/sysconf.route', () => {
  // ===============================================
  // == GET /v1/sysconf/settings - get settings
  // ===============================================
  describe('GET /v1/sysconf/settings - get settings', async () => {
    it('should fail (401) : not authenticated', (done) => {
      request(app).get('/v1/sysconf/settings').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('should fail (403) : not admin', (done) => {
      request(app).get('/v1/sysconf/settings').set(helper.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Vous n'avez pas la permission d'effectuer cela`)
          done()
        })
    })

    it('shoud success (200) : got settings', (done) => {
      request(app).get('/v1/sysconf/settings').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body.loginEnabled)
          assert.isDefined(res.body.registerEnabled)
          assert.isBoolean(res.body.loginEnabled)
          assert.isBoolean(res.body.registerEnabled)
          done()
        })
    })
  })

  // ==========================================================================
  // == PATCH /v1/sysconf/settings/login-enabled/:value - update login-enabled
  // ==========================================================================
  describe('PATCH /v1/sysconf/settings/login-enabled/:value - update login-enabled', async () => {
    it('should fail (401) : not authenticated', (done) => {
      request(app).patch('/v1/sysconf/settings/login-enabled/false').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('should fail (403) : not admin', (done) => {
      request(app).patch('/v1/sysconf/settings/login-enabled/false').set(helper.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Vous n'avez pas la permission d'effectuer cela`)
          done()
        })
    })

    it('should fail (412) : value is not a boolean', (done) => {
      request(app).patch('/v1/sysconf/settings/login-enabled/azeaze').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Veuillez spécifier une valeur`)
          done()
        })
    })

    it('shoud success (200) : login-enabled is now false', (done) => {
      request(app).patch('/v1/sysconf/settings/login-enabled/false').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('shoud success (200) : login-enabled is now true', (done) => {
      request(app).patch('/v1/sysconf/settings/login-enabled/true').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })

  // ==========================================================================
  // == PATCH /v1/sysconf/settings/register-enabled/:value - update register-enabled
  // ==========================================================================
  describe('PATCH /v1/sysconf/settings/register-enabled/:value - update register-enabled', async () => {
    it('should fail (401) : not authenticated', (done) => {
      request(app).patch('/v1/sysconf/settings/register-enabled/false').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('should fail (403) : not admin', (done) => {
      request(app).patch('/v1/sysconf/settings/register-enabled/false').set(helper.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Vous n'avez pas la permission d'effectuer cela`)
          done()
        })
    })

    it('should fail (412) : value is not a boolean', (done) => {
      request(app).patch('/v1/sysconf/settings/register-enabled/azeaze').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Veuillez spécifier une valeur`)
          done()
        })
    })

    it('shoud success (200) : register-enabled is now false', (done) => {
      request(app).patch('/v1/sysconf/settings/register-enabled/false').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('shoud success (200) : register-enabled is now true', (done) => {
      request(app).patch('/v1/sysconf/settings/register-enabled/true').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })
})
