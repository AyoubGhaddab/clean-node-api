const jwt = require('jsonwebtoken')
class TokenGenerator {
  async generate (id) {
    return jwt.sign(id, 'secret')
  }
}
const makeSut = () => {
  const sut = new TokenGenerator()
  return sut
}
describe('TokenGenerator', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = makeSut()
    jwt.token = null
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })
  test('Should return a token if JWT returns a token', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_id')
    expect(token).toBe(jwt.token)
  })
})
