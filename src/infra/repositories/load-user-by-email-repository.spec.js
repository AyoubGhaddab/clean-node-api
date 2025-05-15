const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let userModel
const makeSut = () => {
  return new LoadUserByEmailRepository()
}
describe('LoadUserByEmailRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })
  beforeEach(async () => {
    await userModel.deleteMany()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
  test('Should return a user if user is found', async () => {
    const sut = makeSut()

    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      password: 'hashed_password',
      age: 25,
      state: 'valid_state'
    })
    const user = await sut.load('valid_email@mail.com')
    expect(user).toEqual({ _id: fakeUser.insertedId, password: 'hashed_password' })
  })
  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(MissingParamError)
  })
})
