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
    'Cookie': 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDQ1YzkwYjBhNzgyNzA2OTk3MWUxMTYiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXIxQGVwc2kuZnIiLCJwZXJtaXNzaW9uTGV2ZWwiOiJNRU1CRVIiLCJmaXJzdG5hbWUiOiJBcnRodXIiLCJsYXN0bmFtZSI6IkR1Zm91ciIsInJlbWVtYmVyTWUiOnRydWUsImlhdCI6MTU2NTM2NjMxMCwiZXhwIjoyNjA3NjUzNjYzMTB9.5yb5fhF3jfTXwudWMbBjXNCW8CWnzAUsNG_i14IJdDU;accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDQ1YzkwYjBhNzgyNzA2OTk3MWUxMTYiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXIxQGVwc2kuZnIiLCJwZXJtaXNzaW9uTGV2ZWwiOiJNRU1CRVIiLCJmaXJzdG5hbWUiOiJBcnRodXIiLCJsYXN0bmFtZSI6IkR1Zm91ciIsInJlbWVtYmVyTWUiOmZhbHNlLCJpYXQiOjE1NjQ4NTg1NTIsImV4cCI6MTAwMTU2NDg1NzU1Mn0.tAY7j_oGz80fW4cZJZ-zAMFawRLkTx0OyDGccild0LM'
  },

  defaultSetsWithAccess: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cookie': 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRmMjZhYTA0NmFkNTA2Zjk1ODNiZDMiLCJwZXJtaXNzaW9uTGV2ZWwiOiJBRE1JTiIsImJ0cyI6ZmFsc2UsImlzQWN0aXZlIjp0cnVlLCJmaXJzdG5hbWUiOiJBbGV4YW5kcmUiLCJsYXN0bmFtZSI6IlR1ZXQiLCJlbWFpbCI6ImFsZXhhbmRyZS50dWV0MUBlcHNpLmZyIiwiZ3JhZGUiOiJCMyBHMSIsImlhdCI6MTU2NTUxNzExMCwiZXhwIjoxMDAwMTU2NTUxNjExMH0.H-qPkz1CXboK_izNQ1SO78QSVtBlWhFbWx7wafsp5K4'
  },

  defaultSetsWithAccessWrongUser: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cookie': 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRmMjZhYTA0NmFkNTA2Zjk1ODNiZDEiLCJwZXJtaXNzaW9uTGV2ZWwiOiJNRU1CRVIiLCJidHMiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiZmlyc3RuYW1lIjoiVGVzdCIsImxhc3RuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdC50ZXN0QGVwc2kuZnIiLCJncmFkZSI6IkIzIEcxIiwiaWF0IjoxNTY1NTE5MzYwLCJleHAiOjEwMDAxNTY1NTE4MzYwfQ.NW5W5fpwCPvauLMxS2v5aJX3eyn4PoTd-6rjcQwXyuk'
  },

  defaultSetsWithAccessAdmin: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cookie': 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDQ1YzkwYjBhNzgyNzA2OTk3MWUxMTYiLCJwZXJtaXNzaW9uTGV2ZWwiOiJBRE1JTiIsImJ0cyI6ZmFsc2UsImlzQWN0aXZlIjp0cnVlLCJmaXJzdG5hbWUiOiJBcnRodXIiLCJsYXN0bmFtZSI6IkR1Zm91ciIsImVtYWlsIjoiYXJ0aHVyLmR1Zm91cjFAZXBzaS5mciIsImdyYWRlIjoiQjMgRzEiLCJpYXQiOjE1NjU1MTg0MTAsImV4cCI6MTAwMDE1NjU1MTc0MTB9.AGuT3Q7AtbEYfJ1ODLnmkojAD-Np_Sy-ea8hUWmqhuo'
  },

  defaultSetsWithRefresh: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cookie': 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRmMjZhYTA0NmFkNTA2Zjk1ODNiZDMiLCJwZXJtaXNzaW9uTGV2ZWwiOiJBRE1JTiIsImJ0cyI6ZmFsc2UsImlzQWN0aXZlIjp0cnVlLCJmaXJzdG5hbWUiOiJBbGV4YW5kcmUiLCJsYXN0bmFtZSI6IlR1ZXQiLCJlbWFpbCI6ImFsZXhhbmRyZS50dWV0MUBlcHNpLmZyIiwiZ3JhZGUiOiJCMyBHMSIsImlhdCI6MTU2NTUxNzExMCwiZXhwIjoyNTkzNTY1NTE3MTEwfQ.6JOUIrTFoAqO46qp-k-JNnk2atqa5OfnI6fJrgTLedo'
  },

  // ===========================================
  // == whole feature functions
  // ===========================================
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
        .send({ token: 'aValidToken2', password: 'azez', password2: 'azez' })
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
  },

  requireAuth (method, route) {
    switch (method.toLowerCase()) {
      case 'get':
        it('should fail (401) : aucun cookie', (done) => {
          request(app).get(route).set(this.defaultSets).expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              this.hasBodyMessage(res.body, 'Votre session a expirée, veuillez vous reconnecter')
              assert.isUndefined(res.body.logout)
              done()
            })
        })

        it('should fail (401) : votre session a expirée, veuillez vous reconnecter', (done) => {
          request(app).get(route).set(this.defaultSets)
            .set('Cookie', 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDFkMGU2MDIyYWVjOTA4OWUwY2FlNmQiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXJAZXBzaS5mciIsInBlcm1pc3Npb25MZXZlbCI6Ik1FTUJFUiIsImZpcnN0bmFtZSI6IkFydGh1ciIsImxhc3RuYW1lIjoiRHVmb3VyIiwiaWF0IjoxNTYyMTg1MzE2LCJleHAiOjE1NjIxODUzMTh9.zUgg1QLVEd5KUTu6r31I-uXtjLODXkkY3FMJtZmf5GE')
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              this.hasBodyMessage(res.body, 'Votre session a expirée, veuillez vous reconnecter')
              done()
            })
        })

        it('should fail (401) : votre jeton est invalide, veuillez vous reconnecter', (done) => {
          request(app).get(route).set(this.defaultSets).expect('Content-Type', /json/)
            .set('Cookie', 'accessToken=notAValidToken')
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              this.hasBodyMessage(res.body, 'Votre jeton est invalide, veuillez vous reconnecter')
              done()
            })
        })

        it('should success (200) : accessToken valide', (done) => {
          request(app).get(route).set(this.defaultSetsWithAccess).expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
        })

        it('should fail (401) : votre session a expirée, veuillez vous reconnecter', (done) => {
          request(app).get(route).set(this.defaultSets)
            .set('Cookie', 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDFkMGU2MDIyYWVjOTA4OWUwY2FlNmQiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXJAZXBzaS5mciIsInBlcm1pc3Npb25MZXZlbCI6Ik1FTUJFUiIsImZpcnN0bmFtZSI6IkFydGh1ciIsImxhc3RuYW1lIjoiRHVmb3VyIiwiaWF0IjoxNTYyMTg1MzE2LCJleHAiOjE1NjIxODUzMTh9.zUgg1QLVEd5KUTu6r31I-uXtjLODXkkY3FMJtZmf5GE')
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              this.hasBodyMessage(res.body, 'Votre session a expirée, veuillez vous reconnecter')
              done()
            })
        })

        it('should fail (401) : votre jeton est invalide, veuillez vous reconnecter', (done) => {
          request(app).get(route).set(this.defaultSets).expect('Content-Type', /json/)
            .set('Cookie', 'refreshToken=notAValidToken')
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              this.hasBodyMessage(res.body, 'Votre jeton est invalide, veuillez vous reconnecter')
              done()
            })
        })

        it('should fail (401) : jeton pas présent en base', (done) => {
          request(app).get(route).set(this.defaultSets).expect('Content-Type', /json/)
            .set('Cookie', 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDQ1YmE5NDQwZDUzMzAzOTgxN2U2ZTIiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXIxQGVwc2kuZnIiLCJwZXJtaXNzaW9uTGV2ZWwiOiJNRU1CRVIiLCJmaXJzdG5hbWUiOiJBcnRodXIiLCJsYXN0bmFtZSI6IkR1Zm91ciIsInJlbWVtYmVyTWUiOnRydWUsImlhdCI6MTU2NDg1MDg1MCwiZXhwIjo4NjM5OTk5NTUxNjg1MDg1MH0.w_O98JSgskkM099zl5bnW9KRLby2lfXJvOkh4svrdlg')
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              this.hasBodyMessage(res.body, 'Votre session a expirée, veuillez vous reconnecter')
              done()
            })
        })

        it('should success (200) : refresh réussi', (done) => {
          request(app).get(route).set(this.defaultSetsWithRefresh).expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
        })
        break
      case 'post':
        it('should fail (401) : aucun cookie', (done) => {
          request(app).post(route).set(this.defaultSets).expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              this.hasBodyMessage(res.body, 'Votre session a expirée, veuillez vous reconnecter')
              assert.isUndefined(res.body.logout)
              done()
            })
        })

        it('should fail (401) : votre session a expirée, veuillez vous reconnecter', (done) => {
          request(app).post(route).set(this.defaultSets)
            .set('Cookie', 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDFkMGU2MDIyYWVjOTA4OWUwY2FlNmQiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXJAZXBzaS5mciIsInBlcm1pc3Npb25MZXZlbCI6Ik1FTUJFUiIsImZpcnN0bmFtZSI6IkFydGh1ciIsImxhc3RuYW1lIjoiRHVmb3VyIiwiaWF0IjoxNTYyMTg1MzE2LCJleHAiOjE1NjIxODUzMTh9.zUgg1QLVEd5KUTu6r31I-uXtjLODXkkY3FMJtZmf5GE')
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              this.hasBodyMessage(res.body, 'Votre session a expirée, veuillez vous reconnecter')
              done()
            })
        })

        it('should fail (401) : votre jeton est invalide, veuillez vous reconnecter', (done) => {
          request(app).post(route).set(this.defaultSets).expect('Content-Type', /json/)
            .set('Cookie', 'accessToken=notAValidToken')
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              this.hasBodyMessage(res.body, 'Votre jeton est invalide, veuillez vous reconnecter')
              done()
            })
        })

        it('should success (200) : accessToken valide', (done) => {
          request(app).post(route).set(this.defaultSetsWithAccess).expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
        })

        it('should fail (401) : votre session a expirée, veuillez vous reconnecter', (done) => {
          request(app).post(route).set(this.defaultSets)
            .set('Cookie', 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDFkMGU2MDIyYWVjOTA4OWUwY2FlNmQiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXJAZXBzaS5mciIsInBlcm1pc3Npb25MZXZlbCI6Ik1FTUJFUiIsImZpcnN0bmFtZSI6IkFydGh1ciIsImxhc3RuYW1lIjoiRHVmb3VyIiwiaWF0IjoxNTYyMTg1MzE2LCJleHAiOjE1NjIxODUzMTh9.zUgg1QLVEd5KUTu6r31I-uXtjLODXkkY3FMJtZmf5GE')
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              this.hasBodyMessage(res.body, 'Votre session a expirée, veuillez vous reconnecter')
              done()
            })
        })

        it('should fail (401) : votre jeton est invalide, veuillez vous reconnecter', (done) => {
          request(app).post(route).set(this.defaultSets).expect('Content-Type', /json/)
            .set('Cookie', 'refreshToken=notAValidToken')
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              this.hasBodyMessage(res.body, 'Votre jeton est invalide, veuillez vous reconnecter')
              done()
            })
        })

        it('should fail (401) : jeton pas présent en base', (done) => {
          request(app).post(route).set(this.defaultSets).expect('Content-Type', /json/)
            .set('Cookie', 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDQ1YmE5NDQwZDUzMzAzOTgxN2U2ZTIiLCJlbWFpbCI6ImFydGh1ci5kdWZvdXIxQGVwc2kuZnIiLCJwZXJtaXNzaW9uTGV2ZWwiOiJNRU1CRVIiLCJmaXJzdG5hbWUiOiJBcnRodXIiLCJsYXN0bmFtZSI6IkR1Zm91ciIsInJlbWVtYmVyTWUiOnRydWUsImlhdCI6MTU2NDg1MDg1MCwiZXhwIjo4NjM5OTk5NTUxNjg1MDg1MH0.w_O98JSgskkM099zl5bnW9KRLby2lfXJvOkh4svrdlg')
            .expect(401)
            .end((err, res) => {
              if (err) return done(err)
              this.hasBodyMessage(res.body, 'Votre session a expirée, veuillez vous reconnecter')
              done()
            })
        })

        it('should success (200) : refresh réussi', (done) => {
          request(app).post(route).set(this.defaultSetsWithRefresh).expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
        })
        break
    }
  },

  requireAdminOrSameUser (method, route) {
    switch (method.toLowerCase()) {
      case 'get':
        it('should fail (403) : wrong user & not admin', (done) => {
          request(app).get(route).set(this.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
            .expect(403)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
        })

        it('should success (200) : same user', (done) => {
          request(app).get(route).set(this.defaultSetsWithAccess).expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
        })

        it('should success (200) : admin', (done) => {
          request(app).get(route).set(this.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
        })
        break
      case 'post':
        it('should fail (403) : wrong user & not admin', (done) => {
          request(app).post(route).set(this.defaultSetsWithAccessWrongUser).expect('Content-Type', /json/)
            .expect(403)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
        })

        it('should success (200) : same user', (done) => {
          request(app).post(route).set(this.defaultSetsWithAccess).expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
        })

        it('should success (200) : admin', (done) => {
          request(app).post(route).set(this.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              done()
            })
        })
        break
    }
  }
}
