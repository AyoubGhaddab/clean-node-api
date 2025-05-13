const MongoHelper = require('./helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let db
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
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })
  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
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
  test('Should throw if no userModel is provided', async () => {
    const sut = new LoadUserByEmailRepository()
    const promise = sut.load('invalid_email@mail.com')
    expect(promise).rejects.toThrow()
  })
})
