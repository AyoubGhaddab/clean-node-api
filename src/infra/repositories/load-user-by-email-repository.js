const { MissingParamError } = require('../../utils/errors')

module.exports = class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    if (!this.userModel) {
      throw new Error('Missing userModel')
    }
    if (!email) {
      throw new MissingParamError('email')
    }
    const user = await this.userModel.findOne({ email })
    return user
  }
}
