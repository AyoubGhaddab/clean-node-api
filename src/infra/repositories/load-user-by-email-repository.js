const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')

module.exports = class LoadUserByEmailRepository {
  async load (email) {
    console.log('Email received:', email)
    if (!email) {
      console.log('MissingParamError should be thrown here!')
      throw new MissingParamError('email')
    }
    const db = await MongoHelper.getDb()
    const user = await db.collection('users').findOne({ email }, { projection: { password: 1 } })
    return user
  }
}
