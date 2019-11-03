const assert = require('chai').assert
const request = require('supertest')
const app = require('../../app')

const helper = require('../helpers/test.helper')
const authHelper = require('../helpers/auth.helper')

describe('./routes/tasks.route', () => {
  // ===================================================================
  // == GET /v1/tasks/:userId - get user's tasks
  // ===================================================================
  describe(`GET /v1/tasks/:userId - get user's tasks`, () => {
    authHelper.requireAuth('get', '/v1/tasks/5d4f26aa046ad506f9583bd3')
    authHelper.requireAdminOrSameUser('get', '/v1/tasks/5d4f26aa046ad506f9583bd3')

    it('should fail (404) : user not found', (done) => {
      request(app).get('/v1/tasks/5d4f26aa046ad506f9583bc9').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Aucun utilisateur correspondant')
          done()
        })
    })

    it('should fail (422) : ID is not an ObjectID', (done) => {
      request(app).get('/v1/tasks/azeazeaze').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `ID is not a valid ObjectID`)
          done()
        })
    })

    it('should success (200) : récupération des tâches', (done) => {
      request(app).get('/v1/tasks/5d4f26aa046ad506f9583bd3').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body.tasks)
          assert.isArray(res.body.tasks)
          done()
        })
    })
  })

  // ===================================================================
  // == POST /v1/tasks - create a task
  // ===================================================================
  describe(`POST /v1/tasks - create a task`, () => {
    const date = '02-11-2019'
    const type = 'task'
    const title = 'Un titre de tâche'
    const description = 'Description de ma tâche de test'
    const subject = 'Une matière'

    authHelper.requireAuth('post', '/v1/tasks', { title, type, subject, date, description })

    it('should fail (412) : missing title', (done) => {
      request(app).post('/v1/tasks').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ type, subject, date, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un titre')
          done()
        })
    })

    it('should fail (412) : missing type', (done) => {
      request(app).post('/v1/tasks').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title, subject, date, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un type')
          done()
        })
    })

    it('should fail (412) : missing date', (done) => {
      request(app).post('/v1/tasks').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title, subject, type, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer une date')
          done()
        })
    })

    it('should fail (412) : title too short', (done) => {
      request(app).post('/v1/tasks').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title: 'a', subject, type, date, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'Le titre indiqué est trop court')
          done()
        })
    })

    it('should fail (412) : title too long', (done) => {
      request(app).post('/v1/tasks').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title: 'azeazeaeaeaeaeaeaeaeaeazeazeaeaeyauieyaiuehaiehazoi', subject, type, date, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'Le titre indiqué est trop long')
          done()
        })
    })

    it('should fail (412) : subject too short', (done) => {
      request(app).post('/v1/tasks').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title, subject: 'a', type, date, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'La matière indiquée est trop courte')
          done()
        })
    })

    it('should fail (412) : subject too long', (done) => {
      request(app).post('/v1/tasks').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title, subject: 'azeazeaeaeaeaeaeaeaeaeazeazeaeaeyauieyaiuehaiehazoi', type, date, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'La matière indiquée est trop longue')
          done()
        })
    })

    it('should fail (412) : description too short', (done) => {
      request(app).post('/v1/tasks').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title, subject, type, date, description: 'a' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'La description indiquée est trop courte')
          done()
        })
    })

    it('should fail (412) : invalid date', (done) => {
      request(app).post('/v1/tasks').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title, subject, type, date: 'someInvalidDate', description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'La date indiquée est invalide')
          done()
        })
    })

    it('should fail (412) : invalid type', (done) => {
      request(app).post('/v1/tasks').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title, subject, type: 'someInvalidType', date, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'Le type indiqué est invalide')
          done()
        })
    })

    it('should fail (200) : invalid type', (done) => {
      request(app).post('/v1/tasks').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title, subject, type, date, description })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body.task)
          done()
        })
    })
  })

  // ===================================================================
  // == PATCH /v1/tasks/:userId/done/:taskId - set task as done
  // ===================================================================
  describe(`PATCH /v1/tasks/:userId/done/:taskId - set task as done`, () => {
    authHelper.requireAuth('patch', '/v1/tasks/5d4f26aa046ad506f9583bd3/done/5d4f26bb346ad506f9583bd3')
    authHelper.requireAdminOrSameUser('patch', '/v1/tasks/5d4f26aa046ad506f9583bd3/done/5d4f26bb346ad506f9583bd3')

    it('should fail (404) : user not found', (done) => {
      request(app).patch('/v1/tasks/5d4f26aa046ad506f9583bc9/done/5d4f26bb346ad506f9583bd3').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Aucun utilisateur correspondant')
          done()
        })
    })

    it('should fail (422) : ID is not an ObjectID', (done) => {
      request(app).patch('/v1/tasks/azeazeaze/done/5d4f26bb346ad506f9583bd3').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `ID is not a valid ObjectID`)
          done()
        })
    })

    it('should fail (404) : task not found', (done) => {
      request(app).patch('/v1/tasks/5d4f26aa046ad506f9583bd3/done/5d4f26bb346ad506f9583bd1').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Aucune tâche correspondante')
          done()
        })
    })

    it('should fail (422) : ID is not an ObjectID', (done) => {
      request(app).patch('/v1/tasks/5d4f26aa046ad506f9583bd3/done/azeazeaze').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `ID is not a valid ObjectID`)
          done()
        })
    })

    it('should fail (200) : task is done', (done) => {
      request(app).patch('/v1/tasks/5d4f26aa046ad506f9583bd3/done/5d4f26bb346ad506f9583bd3').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })

  // ===================================================================
  // == PATCH /v1/tasks/:userId/notdone/:taskId - set task as done
  // ===================================================================
  describe(`PATCH /v1/tasks/:userId/notdone/:taskId - set task as notdone`, () => {
    authHelper.requireAuth('patch', '/v1/tasks/5d4f26aa046ad506f9583bd3/notdone/5d4f26bb346ad506f9583bd3')
    authHelper.requireAdminOrSameUser('patch', '/v1/tasks/5d4f26aa046ad506f9583bd3/notdone/5d4f26bb346ad506f9583bd3')

    it('should fail (404) : user not found', (done) => {
      request(app).patch('/v1/tasks/5d4f26aa046ad506f9583bc9/notdone/5d4f26bb346ad506f9583bd3').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Aucun utilisateur correspondant')
          done()
        })
    })

    it('should fail (422) : ID is not an ObjectID', (done) => {
      request(app).patch('/v1/tasks/azeazeaze/notdone/5d4f26bb346ad506f9583bd3').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `ID is not a valid ObjectID`)
          done()
        })
    })

    it('should fail (404) : task not found', (done) => {
      request(app).patch('/v1/tasks/5d4f26aa046ad506f9583bd3/notdone/5d4f26bb346ad506f9583bd1').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Aucune tâche correspondante')
          done()
        })
    })

    it('should fail (422) : ID is not an ObjectID', (done) => {
      request(app).patch('/v1/tasks/5d4f26aa046ad506f9583bd3/notdone/azeazeaze').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `ID is not a valid ObjectID`)
          done()
        })
    })

    it('should fail (200) : task is done', (done) => {
      request(app).patch('/v1/tasks/5d4f26aa046ad506f9583bd3/notdone/5d4f26bb346ad506f9583bd3').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })
})
