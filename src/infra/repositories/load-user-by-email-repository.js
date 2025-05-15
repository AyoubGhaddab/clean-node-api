const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')

module.exports = class LoadUserByEmailRepository {
  async load (email) {
    console.log('Email received:', email)
    if (!email) {
      console.log('MissingParamError should be thrown here!')
      throw new MissingParamError('email')
    }
    const userModel = await MongoHelper.getCollection('users')
    const user = await userModel.findOne({ email }, { projection: { password: 1 } })
    return user
  }
}
