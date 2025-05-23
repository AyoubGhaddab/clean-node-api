const MongoHelper = require('../helpers/mongo-helper')
const { MissingParamError } = require('../../utils/errors')
const UpdateAccessTokenRepository = require('./update-access-token-repository')

let userModel, fakeUserId
const makeSut = () => {
  return new UpdateAccessTokenRepository()
}
describe('UpdateAccessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })
  beforeEach(async () => {
    await userModel.deleteMany()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'hashed_password',
      age: 25,
      state: 'valid_state'
    })
    fakeUserId = fakeUser.insertedId
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should update the user with the given accessToken', async () => {
    const sut = makeSut()
    await sut.update(fakeUserId, 'valid_token')
    const updateFakeUser = await userModel.findOne({ _id: fakeUserId })
    expect(updateFakeUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no parmas is provided', async () => {
    const sut = makeSut()
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(fakeUserId)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
