const assert = require('chai').assert
const request = require('supertest')
const app = require('../../app')
const helper = require('../test.helper')
const Sysconf = require('../../models/sysconf.model')

describe('./routes/user.route', () => {
  // ===============================================
  // == POST /v1/user - user register
  // ===============================================
  describe('POST /v1/user - user register', async () => {
    it('should fail (412) : veuillez indiquer votre prénom', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer votre prénom')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer votre nom', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', email: 'john.doe@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer votre nom')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer votre adresse mail', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', password: '123AZE', password2: '123AZE', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer votre adresse mail')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer un mot de passe', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password2: '123AZE', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un mot de passe')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : veuillez confirmer votre mot de passe', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZE', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez confirmer votre mot de passe')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer votre classe', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZE', password2: '123AZE', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer votre classe')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer votre groupe', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer votre groupe')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer votre ville', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1', group: 'G1' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer votre ville')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          done()
        })
    })

    it('should fail (412) : le prénom indiqué est trop court', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'Jo', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Le prénom indiqué est trop court')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : le nom indiqué est trop court', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Do', email: 'john.doe@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Le nom indiqué est trop court')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : l\'adresse mail indiquée est trop courte', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'a.z@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'L\'adresse mail indiquée est trop courte')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : le mot de passe indiqué est trop court', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZ', password2: '123AZ', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Le mot de passe indiqué est trop court')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : le prénom indiqué est trop long', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'azeazeazeazeazeazeazeazeazeazeaze', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123AZE', password2: 'AZE123', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Le prénom indiqué est trop long')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : le nom indiqué est trop long', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'azeazeazeazeazeazeazeazeazeazeaze', email: 'john.doe@epsi.fr', password: '123AZE', password2: 'AZE123', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Le nom indiqué est trop long')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : l\'adresse mail indiquée est trop longue', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'azeazeazeazeazeazeazeazeazeazeaze.azeazeazeazeazeazeazeazeazeazeaze@epsi.fr', password: '123AZE', password2: 'AZE123', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'L\'adresse mail indiquée est trop longue')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : le mot de passe indiqué est trop long', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: 'azeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeaze', password2: 'azeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeaze', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Le mot de passe indiqué est trop long')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer une adresse mail valide', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doeepsi.fr', password: '123AZE', password2: 'AZE123', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer une adresse mail valide')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : seules les adresses EPSI et WIS sont acceptées', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@gmail.com', password: '123AZE', password2: 'AZE123', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Seules les adresses EPSI et WIS sont acceptées')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : cette adresse mail est déjà utilisée', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'alexandre.tuet@epsi.fr', password: '123AZE', password2: '123AZE', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Cette adresse mail est déjà utilisée')
          done()
        })
    })

    it('should fail (412) : votre mot de passe doit contenir au moins un chiffre', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'alexandre.tuet@epsi.fr', password: 'AZEAZE', password2: 'AZE123', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Votre mot de passe doit contenir au moins un chiffre')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : votre mot de passe doit contenir au moins une lettre', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: '123123', password2: 'AZE123', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Votre mot de passe doit contenir au moins une lettre')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : les deux mots de passe ne correspondent pas', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: 'AZE123', password2: 'AZE1234', grade: 'B1', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Les deux mots de passe ne correspondent pas')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer une classe valide', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: 'AZE123', password2: 'AZE123', grade: 'B1 G4', group: 'G1', city: 'Lyon' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer une classe valide')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (412) : veuillez indiquer une ville valide', (done) => {
      request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: 'AZE123', password2: 'AZE123', grade: 'B1 G4', group: 'G1', city: 'NotACity' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer une ville valide')
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          done()
        })
    })

    it('should fail (403) : inscription désactivée', (done) => {
      Sysconf.findOneAndUpdate({ env: 'production' }, { 'settings.registerEnabled': false }).then(() => {
        request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
          .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: 'AZE123', password2: 'AZE123', grade: 'B1', group: 'G1', city: 'Lyon' })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err)
            helper.hasBodyMessage(res.body, `L'inscription au site est actuellement désactivée... Ré-essayez plus tard !`)
            done()
          })
      })
    })

    it('should success (201) : votre compte a bien été créé', (done) => {
      Sysconf.findOneAndUpdate({ env: 'production' }, { 'settings.registerEnabled': true }).then(() => {
        request(app).post('/v1/user').set(helper.defaultSets).expect('Content-Type', /json/)
          .send({ firstname: 'John', lastname: 'Doe', email: 'john.doe@epsi.fr', password: 'AZE123', password2: 'AZE123', grade: 'B1', group: 'G1', city: 'Lyon' })
          .expect(201)
          .end((err, res) => {
            if (err) return done(err)
            assert.property(res.body, 'id')
            assert.isDefined(res.body.id)
            helper.hasBodyMessage(res.body, 'Votre compte a bien été créé')
            done()
          })
      })
    })
  })

  // ===============================================
  // == GET /v1/user/all - get all users
  // ===============================================
  describe('GET /v1/user/all - get all users', () => {
    it('should fail (401) : not authenticated', (done) => {
      request(app).get('/v1/user/all').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('should fail (403) : not admin', (done) => {
      request(app).get('/v1/user/all').set(helper.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Vous n'avez pas la permission d'effectuer cela`)
          done()
        })
    })

    it('should success (200) : got users list', (done) => {
      request(app).get('/v1/user/all').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body.users)
          assert.isArray(res.body.users)
          done()
        })
    })
  })

  // ====================================================================
  // == POST /v1/user/password-reset - réinitialisation mot de passe
  // ====================================================================
  describe('POST /v1/user/password-reset - réinitialisation mot de passe', () => {
    it('should fail (412) : aucun token transmit', (done) => {
      request(app).post('/v1/user/password-reset').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Aucun token transmit')
          done()
        })
    })

    it('should fail (404) : le lien actuel est invalide', (done) => {
      request(app).post('/v1/user/password-reset').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'notAValidToken' })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Le lien actuel est invalide')
          done()
        })
    })

    it('should fail (412) : le type du token est invalide', (done) => {
      request(app).post('/v1/user/password-reset').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'aValidToken3' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Le type du token est invalide')
          done()
        })
    })

    helper.testPasswordWithConfirmation('/v1/user/password-reset')
  })

  // ============================================================
  // == PATCH /v1/user/password - changement de mot de passe
  // ============================================================
  describe('PATCH /v1/user/password - changement mot de passe', () => {
    it('should fail (401) : authentification requise', (done) => {
      request(app).patch('/v1/user/password').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({ password: 'password2', password2: 'password2' })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('should fail (412) : veuillez indiquer un mot de passe', (done) => {
      request(app).patch('/v1/user/password').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({})
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un mot de passe')
          done()
        })
    })

    it('should fail (412) : veuillez confirmer votre mot de passe', (done) => {
      request(app).patch('/v1/user/password').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ password: 'password123' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez confirmer votre mot de passe')
          done()
        })
    })

    it('should fail (412) : le mot de passe indiqué est trop court', (done) => {
      request(app).patch('/v1/user/password').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ password: 'azez', password2: 'azez' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'Le mot de passe indiqué est trop court')
          done()
        })
    })

    it('should fail (412) : le mot de passe indiqué est trop long', (done) => {
      request(app).patch('/v1/user/password').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ password: 'azeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeaze', password2: 'aazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeze' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'Le mot de passe indiqué est trop long')
          done()
        })
    })

    it('should fail (412) : votre mot de passe doit contenir au moins un chiffre', (done) => {
      request(app).patch('/v1/user/password').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ password: 'azeaze', password2: 'azeaze' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'Votre mot de passe doit contenir au moins un chiffre')
          done()
        })
    })

    it('should fail (412) : votre mot de passe doit contenir au moins une lettre', (done) => {
      request(app).patch('/v1/user/password').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ password: '123123', password2: '123123' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'Votre mot de passe doit contenir au moins une lettre')
          done()
        })
    })

    it('should fail (412) : les deux mots de passe ne correspondent pas', (done) => {
      request(app).patch('/v1/user/password').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ password: 'azeaze1', password2: 'azeaze123' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'Les deux mots de passe ne correspondent pas')
          done()
        })
    })

    it('should success (200) : mot de passe a bien été modifié', (done) => {
      request(app).patch('/v1/user/password').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ password: 'password2', password2: 'password2' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Votre mot de passe a bien été modifié')
          done()
        })
    })
  })

  // ==============================================================================
  // == PATCH /v1/user/information-mails/:value - toggle inscription mail list
  // ==============================================================================
  describe('PATCH /v1/user/information-mails/:value - changement mot de passe', () => {
    it('should fail (401) : authentification requise', (done) => {
      request(app).patch('/v1/user/information-mails/false').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('should fail (412) : invalid value', (done) => {
      request(app).patch('/v1/user/information-mails/someInvalidValue').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Veuillez spécifier une valeur')
          done()
        })
    })

    it('should success (200) : hasInformationMails true', (done) => {
      request(app).patch('/v1/user/information-mails/true').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('should success (200) : hasInformationMails false', (done) => {
      request(app).patch('/v1/user/information-mails/false').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })

  // ============================================================
  // == PATCH /v1/user/:userId - mise à jour utilisateur
  // ============================================================
  describe('PATCH /v1/user/:userId - mise à jour donnés utilisateur', () => {
    it('should fail (401) : authentification requise', (done) => {
      request(app).patch('/v1/user/5d4f26aa046ad506f9583bd1').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('should fail (403) : not admin', (done) => {
      request(app).patch('/v1/user/5d4f26aa046ad506f9583bd1').set(helper.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Vous n'avez pas la permission d'effectuer cela`)
          done()
        })
    })

    it('should fail (404) : aucun utilisateur correspondant', (done) => {
      request(app).patch('/v1/user/5d4f26aa046ad506f9583bd2').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Aucun utilisateur correspondant`)
          done()
        })
    })

    it('should fail (412) : champs invalides', (done) => {
      request(app).patch('/v1/user/5d4f26aa046ad506f9583bd1').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .send({
          userId: '5d4f26aa046ad506f9583bd1',
          firstname: 'a',
          lastname: 'a',
          email: 't.t@epsi.fr',
          permissionLevel: 'not a valide',
          grade: 'not a valid grade',
          group: 'not a valid group',
          city: 'not a vaid city',
          bts: 'not a boolean',
          isActive: 'not a boolean'
        })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Certains champs requis sont invalides`)
          helper.hasBodyErrorsThatContains(res.body, 'Le prénom indiqué est trop court')
          helper.hasBodyErrorsThatContains(res.body, 'Le nom indiqué est trop court')
          helper.hasBodyErrorsThatContains(res.body, 'L\'adresse mail indiquée est trop courte')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer une classe valide')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un groupe valide')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer une ville valide')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un role valide')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer une option BTS valide')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer une activité valide')
          done()
        })
    })

    it('should fail (412) : champs invalides', (done) => {
      request(app).patch('/v1/user/5d4f26aa046ad506f9583bd1').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .send({
          userId: '5d4f26aa046ad506f9583bd1',
          firstname: 'azeaozeuazeahzeaehazuiehazehazjie',
          lastname: 'azeaozeuazeahzeaehazuiehazehazjie',
          email: 'azeaozeuazeahzeaehazuiehazehazjie.azeaozeuazeahzeaehazuiehazehazjie@example.com',
          permissionLevel: 'not a valide',
          grade: 'not a valid grade',
          group: 'not a valid group',
          city: 'not a valid city',
          bts: 'not a boolean',
          isActive: 'not a boolean'
        })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Certains champs requis sont invalides`)
          helper.hasBodyErrorsThatContains(res.body, 'Le prénom indiqué est trop long')
          helper.hasBodyErrorsThatContains(res.body, 'Le nom indiqué est trop long')
          helper.hasBodyErrorsThatContains(res.body, 'L\'adresse mail indiquée est trop longue')
          helper.hasBodyErrorsThatContains(res.body, 'Seules les adresses EPSI et WIS sont acceptées')
          done()
        })
    })

    it('should fail (412) : email invalide', (done) => {
      request(app).patch('/v1/user/5d4f26aa046ad506f9583bd1').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .send({
          userId: '5d4f26aa046ad506f9583bd1',
          firstname: 'azeaze',
          lastname: 'azeaze',
          email: 'azeaze.azeazee@xample',
          permissionLevel: 'MEMBER',
          grade: 'B1',
          group: 'G1',
          city: 'Lyon',
          bts: true,
          isActive: true
        })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Certains champs requis sont invalides`)
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer une adresse mail valide')
          done()
        })
    })

    it('should success (200) : aucun utilisateur correspondant', (done) => {
      request(app).patch('/v1/user/5d4f26aa046ad506f9583bd1').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .send({
          userId: '5d4f26aa046ad506f9583bd1',
          firstname: 'Test2',
          lastname: 'Test2',
          email: 'test2.test2@epsi.fr',
          permissionLevel: 'MEMBER',
          grade: 'I2',
          group: 'G2 (dev)',
          city: 'Lyon',
          bts: true,
          isActive: true
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Les informations ont bien été modifiées`)
          done()
        })
    })
  })

  // ============================================================
  // == DELETE /v1/user/:userId - suppression compte
  // ============================================================
  describe('DELETE /v1/user/:userId - mise à jour donnés utilisateur', () => {
    it('should fail (401) : authentification requise', (done) => {
      request(app).delete('/v1/user/5d4f26aa046ad506f9583bd1').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('should fail (403) : not admin', (done) => {
      request(app).delete('/v1/user/5d4f26aa046ad506f9583bd1').set(helper.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Vous n'avez pas la permission d'effectuer cela`)
          done()
        })
    })

    it('should fail (404) : aucun utilisateur correspondant', (done) => {
      request(app).delete('/v1/user/5d4f26aa046ad506f9583bd2').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Aucun utilisateur correspondant`)
          done()
        })
    })

    it('should fail (423) : no self delete', (done) => {
      request(app).delete('/v1/user/5d45c90b0a7827069971e116').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(423)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Vous ne pouvez vous auto-supprimer depuis ce panel, pour cela rendez-vous sur la page "Paramètres"`)
          done()
        })
    })

    it('should success (200) : le compte à bien été supprimé', (done) => {
      request(app).delete('/v1/user/5d4f26aa046ad506f9583bd1').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Le compte à bien été supprimé`)
          done()
        })
    })
  })
})
