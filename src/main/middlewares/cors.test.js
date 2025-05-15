const request = require('supertest')
let app
describe('CORS Middleware', () => {
  beforeEach(() => {
    jest.resetModules()
    app = require('../config/app')
  })
  test('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send('')
    })
    const res = await request(app).get('/test_cors')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
