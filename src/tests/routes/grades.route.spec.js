const assert = require('chai').assert
const request = require('supertest')
const app = require('../../app')

const helper = require('../helpers/test.helper')
const authHelper = require('../helpers/auth.helper')

describe('./routes/grades.route', () => {
  // ===================================================================
  // == POST /v1/grades - create a grade
  // ===================================================================
  describe(`POST /v1/grades - create a grade`, () => {
    const value = 15
    const coefficient = 2
    const subject = 'Français'
    const date = '01-04-2099'
    const description = 'Description de la note'

    authHelper.requireAuth('post', '/v1/grades', { value, coefficient, subject, date, description })

    it('should fail (412) : missing subject', (done) => {
      request(app).post('/v1/grades').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ value, coefficient, date, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer la matière')
          done()
        })
    })

    it('should fail (412) : missing date', (done) => {
      request(app).post('/v1/grades').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ value, coefficient, subject, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer la date')
          done()
        })
    })

    it('should fail (412) : invalid value', (done) => {
      request(app).post('/v1/grades').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ value: -1, coefficient, subject, date, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'La note indiquée n\'est pas valide')
          done()
        })
    })

    it('should fail (412) : invalid value', (done) => {
      request(app).post('/v1/grades').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ value: 21, coefficient, subject, date, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'La note indiquée n\'est pas valide')
          done()
        })
    })

    it('should fail (412) : invalid coefficient', (done) => {
      request(app).post('/v1/grades').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ value, coefficient: -1, subject, date, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'Le coefficient indiqué n\'est pas valide')
          done()
        })
    })

    it('should fail (412) : invalid coefficient', (done) => {
      request(app).post('/v1/grades').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ value, coefficient: 11, subject, date, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'Le coefficient indiqué n\'est pas valide')
          done()
        })
    })

    it('should fail (412) : subject too long', (done) => {
      request(app).post('/v1/grades').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ value, coefficient, subject: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', date, description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'La matière indiquée est trop longue')
          done()
        })
    })

    it('should fail (412) : description too long', (done) => {
      request(app).post('/v1/grades').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ value, coefficient, subject, date, description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'La description indiquée est trop longue')
          done()
        })
    })

    it('should fail (412) : invalid date', (done) => {
      request(app).post('/v1/grades').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ value, coefficient, subject, date: '31-31-2099', description })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'La date indiquée est invalide')
          done()
        })
    })

    it('should success (200) : grade created', (done) => {
      request(app).post('/v1/grades').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ value, coefficient, subject, date, description })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body.grade)
          done()
        })
    })

    it('should success (200) : grade created (no value)', (done) => {
      request(app).post('/v1/grades').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ coefficient, subject, date, description })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body.grade)
          done()
        })
    })

    it('should success (200) : grade created (no coefficient)', (done) => {
      request(app).post('/v1/grades').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ value, subject, date, description })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body.grade)
          done()
        })
    })

    it('should success (200) : grade created (no description)', (done) => {
      request(app).post('/v1/grades').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ value, coefficient, subject, date })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body.grade)
          done()
        })
    })
  })
})
