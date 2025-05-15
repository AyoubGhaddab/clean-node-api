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
})
