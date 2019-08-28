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

    it('should fail (403) : veuillez confirmer votre adresse mail', (done) => {
      request(app).post('/api/v1/auth').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ email: 'thomas.zimmermann@epsi.fr', password: 'password' })
        .expect(403)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Veuillez confirmer votre email afin de pouvoir vous connecter')
          done()
        })
    })

    it('should success (201) : connexion réussie (sans rememberMe)', (done) => {
      request(app).post('/api/v1/auth').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ email: 'arthur.dufour1@epsi.fr', password: 'password' })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          assert.property(res.body, 'user')
          assert.isDefined(res.body.user)
          assert.isDefined(res.header['set-cookie'][0])
          assert.isTrue(res.header['set-cookie'][0].includes('accessToken'))
          assert.isUndefined(res.header['set-cookie'][1])
          helper.hasBodyMessage(res.body, 'Connexion réussie')
          done()
        })
    })

    it('should success (201) : connexion réussie (avec rememberMe)', (done) => {
      request(app).post('/api/v1/auth').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ email: 'arthur.dufour1@epsi.fr', password: 'password', rememberMe: true })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          assert.property(res.body, 'user')
          assert.isDefined(res.body.user)
          assert.isDefined(res.header['set-cookie'][0])
          assert.isTrue(res.header['set-cookie'][0].includes('accessToken'))
          assert.isDefined(res.header['set-cookie'][1])
          assert.isTrue(res.header['set-cookie'][1].includes('refreshToken'))
          helper.hasBodyMessage(res.body, 'Connexion réussie')
          done()
        })
    })
  })

  // ===============================================
  // == POST /api/v1/auth/logout - user logout
  // ===============================================
  describe('POST /api/v1/auth/logout - user logout', () => {
    it('should success (200) : ...', (done) => {
      request(app).post('/api/v1/auth/logout').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          // test useless since we can't access cookies from js but anyway
          done()
        })
    })
  })

  // =======================================================
  // == POST /api/v1/auth/verify/email - vérification email
  // =======================================================
  describe('POST /api/v1/auth/verify/email - vérification adresse email', () => {
    it('should fail (412) : aucun token transmit', (done) => {
      request(app).post('/api/v1/auth/verify/email').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Aucun token transmit')
          done()
        })
    })

    it('should fail (404) : le lien actuel est invalide', (done) => {
      request(app).post('/api/v1/auth/verify/email').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'notAValidToken' })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Le lien actuel est invalide')
          done()
        })
    })

    it('should fail (412) : le type du token est invalide', (done) => {
      request(app).post('/api/v1/auth/verify/email').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'aValidToken2' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Le type du token est invalide')
          done()
        })
    })

    it('should success (200) : adresse mail bien validée', (done) => {
      request(app).post('/api/v1/auth/verify/email').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'aValidToken' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Votre adresse mail a bien été validée')
          done()
        })
    })
  })

  // =================================================================================
  // == POST /api/v1/auth/password-reset/send-mail - envoie mail réinitialisation mdp
  // =================================================================================
  describe('POST /api/v1/auth/password-reset/send-mail - envoie mail réinitialisation mdp', () => {
    it('should fail (412) : veuillez indiquer votre adresse mail', (done) => {
      request(app).post('/api/v1/auth/password-reset/send-mail').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Veuillez indiquer votre adresse mail')
          done()
        })
    })

    it('should fail (404) : l\'adresse mail indiquée ne correspond à aucun utilisateur', (done) => {
      request(app).post('/api/v1/auth/password-reset/send-mail').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ email: 'notAValidEmail' })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'L\'adresse mail indiquée ne correspond à aucun utilisateur')
          done()
        })
    })

    it('should success (200) : l\'email a bien été envoyé', (done) => {
      request(app).post('/api/v1/auth/password-reset/send-mail').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ email: 'alexandre.tuet1@epsi.fr' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'L\'email a bien été envoyé')
          done()
        })
    })
  })
})
