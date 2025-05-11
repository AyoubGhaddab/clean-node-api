module.exports = class InvalidParamError extends Error {
  constructor (paramName) {
    super(`Invalid Param Error:${paramName}`)
    this.name = 'InvalidParamError'
  }
}
