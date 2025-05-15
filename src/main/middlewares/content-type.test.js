const request = require('supertest')
const app = require('../config/app')

describe('Content-Type Middleware', () => {
  test('Should return json content-type as default', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send({})
    })
    const res = await request(app).get('/test_content_type').expect('content-type', /json/)
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
  })
  test('Should return xml content-type if forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.set('content-type', 'text/xml')
      res.send('')
    })
    const res = await request(app).get('/test_content_type_xml').expect('content-type', /xml/)
    expect(res.headers['content-type']).toBe('text/xml; charset=utf-8')
  })
})
