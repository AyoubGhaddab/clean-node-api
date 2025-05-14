const MongoHelper = require('../helpers/mongo-helper')
const { MissingParamError } = require('../../utils/errors')
const UpdateAccessTokenRepository = require('./update-access-token-repository')
const FAKE_USER = {
  email: 'valid_email@mail.com',
  name: 'valid_name',
  password: 'hashed_password',
  age: 25,
  state: 'valid_state'
}

let db
const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    sut,
    userModel
  }
}
describe('UpdateAccessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })
  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne(FAKE_USER)
    await sut.update(fakeUser.insertedId, 'valid_token')
    const updateFakeUser = await userModel.findOne({ _id: fakeUser.insertedId })
    expect(updateFakeUser.accessToken).toBe('valid_token')
  })
  test('Should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const userModel = db.collection('users')
    const fakeUser = await userModel.insertOne(FAKE_USER)
    const promise = sut.update(fakeUser.insertedId, 'valid_token')
    expect(promise).rejects.toThrow()
  })
  test('Should throw if no parmas is provided', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne(FAKE_USER)
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(fakeUser.insertedId)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
