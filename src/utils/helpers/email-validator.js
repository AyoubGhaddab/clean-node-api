const validator = require('validator')
const { MissingParamError } = require('../../utils/errors')

module.exports = class EmailValidator {
  isValid (email) {
    if (!email) {
      throw new MissingParamError('email')
    }
    return validator.isEmail(email)
  }
}
