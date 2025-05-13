const { MongoClient } = require('mongodb')
let client, db

class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = await this.userModel.findOne({ email })
    return user
  }
}
const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return {
    sut,
    userModel
  }
}
describe('LoadUserByEmailRepository', () => {
  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
    })
    db = client.db()
  })
  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })
  afterAll(async () => {
    await client.close()
  })
  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()

    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
  test('Should return a user if user is found', async () => {
    const { sut, userModel } = makeSut()

    const { insertedId } = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'hashed_password',
      age: 25,
      state: 'valid_state'
    })
    const expectedUser = await userModel.findOne({ _id: insertedId })
    const user = await sut.load('valid_email@mail.com')
    expect(user).toEqual(expectedUser)
  })
})
