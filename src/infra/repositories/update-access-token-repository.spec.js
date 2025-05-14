const MongoHelper = require('../helpers/mongo-helper')

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (id, accessToken) {
    await this.userModel.updateOne(
      { _id: id },
      { $set: { accessToken } }
    )
  }
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
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'hashed_password',
      age: 25,
      state: 'valid_state'
    })
    await sut.update(fakeUser.insertedId, 'valid_token')
    const updateFakeUser = await userModel.findOne({ _id: fakeUser.insertedId })
    expect(updateFakeUser.accessToken).toBe('valid_token')
  })
})
