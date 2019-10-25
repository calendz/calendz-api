const assert = require('chai').assert
const request = require('supertest')
const app = require('../../app')

const helper = require('../helpers/test.helper')

describe('./routes/others.route', () => {
  // ==========================================================
  // == GET /a/route/that/doesnt/exist - test 404
  // ==========================================================
  describe('GET /a/route/that/doesnt/exist - 404 not found', () => {
    it('should fail (404) : route not found', (done) => {
      request(app).get('/a/route/that/doesnt/exist')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Route not found')
          done()
        })
    })
  })

  // ==========================================================
  // == GET /v1/health-check - api status
  // ==========================================================
  describe('GET /v1/health-check - api status', () => {
    it('should success (200) : ok', (done) => {
      request(app).get('/v1/health-check')
        .expect(200, done)
    })
  })

  // ==========================================================
  // == GET /v1/auth/health-check - auth status
  // ==========================================================
  describe('GET /v1/auth/health-check - check auth status', () => {
    it('should fail (401) : aucun cookie', (done) => {
      request(app).get('/v1/auth/health-check').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Votre session a expirée, veuillez vous reconnecter')
          assert.isTrue(res.body.logout)
          done()
        })
    })

    it('should fail (401) : votre session a expirée, veuillez vous reconnecter', (done) => {
      request(app).get('/v1/auth/health-check').set(helper.defaultSets)
        .set('Cookie', 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDFkMGU2MDIyYWVjOTA4OWUwY2FlNmQiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXJAZXBzaS5mciIsInBlcm1pc3Npb25MZXZlbCI6Ik1FTUJFUiIsImZpcnN0bmFtZSI6IkFydGh1ciIsImxhc3RuYW1lIjoiRHVmb3VyIiwiaWF0IjoxNTYyMTg1MzE2LCJleHAiOjE1NjIxODUzMTh9.zUgg1QLVEd5KUTu6r31I-uXtjLODXkkY3FMJtZmf5GE')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Votre session a expirée, veuillez vous reconnecter')
          done()
        })
    })

    it('should fail (401) : votre jeton est invalide, veuillez vous reconnecter', (done) => {
      request(app).get('/v1/auth/health-check').set(helper.defaultSets).expect('Content-Type', /json/)
        .set('Cookie', 'accessToken=notAValidToken')
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Votre jeton est invalide, veuillez vous reconnecter')
          done()
        })
    })

    it('should success (200) : accessToken valide', (done) => {
      request(app).get('/v1/auth/health-check').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('should fail (401) : votre session a expirée, veuillez vous reconnecter', (done) => {
      request(app).get('/v1/auth/health-check').set(helper.defaultSets)
        .set('Cookie', 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDFkMGU2MDIyYWVjOTA4OWUwY2FlNmQiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXJAZXBzaS5mciIsInBlcm1pc3Npb25MZXZlbCI6Ik1FTUJFUiIsImZpcnN0bmFtZSI6IkFydGh1ciIsImxhc3RuYW1lIjoiRHVmb3VyIiwiaWF0IjoxNTYyMTg1MzE2LCJleHAiOjE1NjIxODUzMTh9.zUgg1QLVEd5KUTu6r31I-uXtjLODXkkY3FMJtZmf5GE')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Votre session a expirée, veuillez vous reconnecter')
          done()
        })
    })

    it('should fail (401) : votre jeton est invalide, veuillez vous reconnecter', (done) => {
      request(app).get('/v1/auth/health-check').set(helper.defaultSets).expect('Content-Type', /json/)
        .set('Cookie', 'refreshToken=notAValidToken')
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Votre jeton est invalide, veuillez vous reconnecter')
          done()
        })
    })

    it('should fail (401) : jeton pas présent en base', (done) => {
      request(app).get('/v1/auth/health-check').set(helper.defaultSets).expect('Content-Type', /json/)
        .set('Cookie', 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDQ1YmE5NDQwZDUzMzAzOTgxN2U2ZTIiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXIxQGVwc2kuZnIiLCJwZXJtaXNzaW9uTGV2ZWwiOiJNRU1CRVIiLCJmaXJzdG5hbWUiOiJBcnRodXIiLCJsYXN0bmFtZSI6IkR1Zm91ciIsInJlbWVtYmVyTWUiOnRydWUsImlhdCI6MTU2NDg1MDg1MCwiZXhwIjo4NjM5OTk5NTUxNjg1MDg1MH0.w_O98JSgskkM099zl5bnW9KRLby2lfXJvOkh4svrdlg')
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Votre session a expirée, veuillez vous reconnecter')
          done()
        })
    })

    it('should success (200) : refresh réussi', (done) => {
      request(app).get('/v1/auth/health-check').set(helper.defaultSetsWithRefresh).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })

  // ==========================================================
  // == GET /v1/version - get api's version
  // ==========================================================
  describe('GET /v1/version - api version', () => {
    it('should success (200) : version', (done) => {
      request(app).get('/v1/version')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body)
          assert.isDefined(res.body.version)
          done()
        })
    })
  })
})
