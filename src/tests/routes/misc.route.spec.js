const request = require('supertest')
const app = require('../../app')
const helper = require('../test.helper')

describe('./routes/misc.route', () => {
  // ===============================================
  // == POST /v1/contact - contact form
  // ===============================================
  describe('POST /v1/contact - contact form', () => {
    it('should fail (412) : certains champs requis sont manquant', (done) => {
      request(app).post('/v1/contact').set(helper.defaultSets).expect('Content-Type', /json/)
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrors(res.body)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un sujet')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer votre adresse mail')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un message')
          done()
        })
    })

    it('should fail (412) : certains champs requis sont invalides', (done) => {
      request(app).post('/v1/contact').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({
          subject: 'Eiusmod non eu veniam dolor non ullamco eiusmod id pariatur. Veniam aliqua cillum ullamco incididunt veniam culpa velit exercitation et. Exercitation excepteur non mollit nulla sit laborum esse Lorem sint non consectetur. Velit pariatur do incididunt dolore elit eiusmod est nostrud enim nulla dolore cillum. Exercitation reprehenderit qui occaecat exercitation culpa veniam nulla incididunt. Eu ipsum qui et velit commodo ex do occaecat magna ea eu non qui. Magna laborum consequat ex et.',
          email: 'averylongemailaddressthatwontbeallowedbecauseofitslength.andbecauseitsnotvalid@example',
          message: 'Some short message'
        })
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyErrors(res.body)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont invalides')
          helper.hasBodyErrorsThatContains(res.body, 'Le sujet est trop long')
          helper.hasBodyErrorsThatContains(res.body, `L'adresse mail est trop longue`)
          helper.hasBodyErrorsThatContains(res.body, `Veuillez indiquer une adresse mail valide`)
          done()
        })
    })

    it('should success (200) : send contact email', (done) => {
      request(app).post('/v1/contact').set(helper.defaultSets).expect('Content-Type', /json/)
        .send({
          subject: 'Test message',
          email: 'test@example.com',
          message: 'Some short message'
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })
})
