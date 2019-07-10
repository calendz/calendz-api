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
  },

  testPasswordWithConfirmation (route) {
    it('should fail (412) : veuillez indiquer un mot de passe', (done) => {
      request(app).post(route).set(this.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'aValidToken2' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          this.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          this.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un mot de passe')
          done()
        })
    })

    it('should fail (412) : veuillez confirmer votre mot de passe', (done) => {
      request(app).post(route).set(this.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'aValidToken2', password: 'password123' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          this.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          this.hasBodyErrorsThatContains(res.body, 'Veuillez confirmer votre mot de passe')
          done()
        })
    })

    it('should fail (412) : le mot de passe indiqué est trop court', (done) => {
      request(app).post(route).set(this.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'aValidToken2', password: 'aze', password2: 'aze' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          this.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          this.hasBodyErrorsThatContains(res.body, 'Le mot de passe indiqué est trop court')
          done()
        })
    })

    it('should fail (412) : le mot de passe indiqué est trop long', (done) => {
      request(app).post(route).set(this.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'aValidToken2', password: 'azeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeaze', password2: 'aazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeazeze' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          this.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          this.hasBodyErrorsThatContains(res.body, 'Le mot de passe indiqué est trop long')
          done()
        })
    })

    it('should fail (412) : votre mot de passe doit contenir au moins un chiffre', (done) => {
      request(app).post(route).set(this.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'aValidToken2', password: 'azeaze', password2: 'azeaze' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          this.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          this.hasBodyErrorsThatContains(res.body, 'Votre mot de passe doit contenir au moins un chiffre')
          done()
        })
    })

    it('should fail (412) : votre mot de passe doit contenir au moins une lettre', (done) => {
      request(app).post(route).set(this.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'aValidToken2', password: '123123', password2: '123123' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          this.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          this.hasBodyErrorsThatContains(res.body, 'Votre mot de passe doit contenir au moins une lettre')
          done()
        })
    })

    it('should fail (412) : les deux mots de passe ne correspondent pas', (done) => {
      request(app).post(route).set(this.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'aValidToken2', password: 'azeaze1', password2: 'azeaze123' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          this.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          this.hasBodyErrorsThatContains(res.body, 'Les deux mots de passe ne correspondent pas')
          done()
        })
    })

    it('should success (200) : votre mot de passe a bien été modifié', (done) => {
      request(app).post(route).set(this.defaultSets).expect('Content-Type', /json/)
        .send({ token: 'aValidToken2', password: 'azeaze123', password2: 'azeaze123' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          this.hasBodyMessage(res.body, 'Votre mot de passe a bien été modifié')
          done()
        })
    })
  }
}
