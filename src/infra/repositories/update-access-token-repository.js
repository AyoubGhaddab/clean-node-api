const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')

module.exports = class UpdateAccessTokenRepository {
  async update (id, accessToken) {
    if (!id) {
      throw new MissingParamError('userId')
    }
    if (!accessToken) {
      throw new MissingParamError('accessToken')
    }
    const db = await MongoHelper.getDb()
    await db.collection('users').updateOne(
      { _id: id },
      { $set: { accessToken } }
    )
  }
}
