const assert = require('chai').assert
const request = require('supertest')
const app = require('../../app')
const helper = require('../test.helper')

describe('./routes/auth.route', () => {
  // ===============================================
  // == POST /api/v1/auth - user login
  // ===============================================
  describe('POST /api/v1/auth - user login', () => {
    it('should fail (412) : certains champs requis sont manquant', (done) => {
      request(app).post('/api/v1/auth').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrors(res.body)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer votre mot de passe', (done) => {
      request(app).post('/api/v1/auth').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ email: 'arthur.dufour@epsi.fr' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer votre mot de passe')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer votre adresse mail', (done) => {
      request(app).post('/api/v1/auth').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ password: 'password' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer votre adresse mail')
          done()
        })
    })

    it('should fail (404) : l\'adresse mail indiquée ne correspond à aucun utilisateur', (done) => {
      request(app).post('/api/v1/auth').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ email: 'arthur.dufour@epsi.com', password: 'password' })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'L\'adresse mail indiquée ne correspond à aucun utilisateur')
          done()
        })
    })

    it('should fail (401) : mot de passe invalide', (done) => {
      request(app).post('/api/v1/auth').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ email: 'arthur.dufour1@epsi.fr', password: 'azeaze' })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Mot de passe invalide')
          done()
        })
    })

    it('should success (201) : connexion réussie', (done) => {
      request(app).post('/api/v1/auth').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ email: 'arthur.dufour1@epsi.fr', password: 'password' })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          assert.property(res.body, 'user')
          assert.isDefined(res.body.user)
          assert.property(res.body, 'accessToken')
          assert.isDefined(res.body.accessToken)
          assert.property(res.body, 'refreshToken')
          assert.isDefined(res.body.refreshToken)
          helper.hasBodyMessage(res.body, 'Connexion réussie')
          done()
        })
    })
  })

  // ===============================================
  // == POST /api/v1/auth/refresh - login refresh
  // ===============================================
  describe('POST /api/v1/auth/refresh - login refresh', () => {
    it('should fail (412) : aucun accessToken transmit', (done) => {
      request(app).post('/api/v1/auth/refresh').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Aucun accessToken transmit')
          done()
        })
    })

    it('should fail (412) : votre jeton a expiré, veuillez vous reconnecter', (done) => {
      request(app).post('/api/v1/auth/refresh').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDFkMGU2MDIyYWVjOTA4OWUwY2FlNmQiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXJAZXBzaS5mciIsInBlcm1pc3Npb25MZXZlbCI6Ik1FTUJFUiIsImZpcnN0bmFtZSI6IkFydGh1ciIsImxhc3RuYW1lIjoiRHVmb3VyIiwiaWF0IjoxNTYyMTg1MzE2LCJleHAiOjE1NjIxODUzMTh9.zUgg1QLVEd5KUTu6r31I-uXtjLODXkkY3FMJtZmf5GE' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Votre jeton a expiré, veuillez vous reconnecter')
          done()
        })
    })

    it('should fail (412) : votre jeton est invalide, veuillez vous reconnecter', (done) => {
      request(app).post('/api/v1/auth/refresh').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ accessToken: 'eyJhbGaiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDFkMGM5ZjAxNWFiNDA3YzExY2EyMjciLCJlbWFpbCI6ImFydGh1ci5kdWZvdXJAZXBzaS5mciIsInBlcm1pc3Npb25MZXZlbCI6Ik1FTUJFUiIsImZpcnN0bmFtZSI6IkFydGh1ciIsImxhc3RuYW1lIjoiRHVmb3VyIiwicmVmcmVzaEtleSI6IjBua1haOVJjVHVsd0d6SEg5QTdJY2c9PSIsImlhdCI6MTU2MjE4NDg2NH0.ZrWP0jpTtSiDxpr_oPXxGhXS65UEIrH1HOWEELMEO' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Votre jeton est invalide, veuillez vous reconnecter')
          done()
        })
    })

    it('should success (200) : connexion réussie', (done) => {
      request(app).post('/api/v1/auth/refresh').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDFkMTE5NTZmNmJmYjBhNGMzNDIxNDkiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXJAZXBzaS5mciIsInBlcm1pc3Npb25MZXZlbCI6Ik1FTUJFUiIsImZpcnN0bmFtZSI6IkFydGh1ciIsImxhc3RuYW1lIjoiRHVmb3VyIiwiaWF0IjoxNTYyMTg2MTU3LCJleHAiOjFlKzUyfQ.V5kApXVUW4rtehBqnm6HyEOejnsy9x_sP7Dgpn1zeZc' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.property(res.body, 'user')
          assert.isDefined(res.body.user)
          helper.hasBodyMessage(res.body, 'Connexion réussie')
          done()
        })
    })
  })
})
