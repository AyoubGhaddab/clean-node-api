const AuthUseCase = require('./auth-usecase')
const { MissingParamError } = require('../../utils/errors')
const makeEncypter = () => {
  class EncrypterSpy {
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
      return this.isValid
    }
  }
  const encryptSpy = new EncrypterSpy()
  encryptSpy.isValid = true
  return encryptSpy
}
const loadUserByEmailRepositorySpy = () => {
  class LoadUserByEmailRepository {
    async load (email) {
      this.email = email
      return this.user
    }
  }
  const loadUserByEmailRepository = new LoadUserByEmailRepository()
  loadUserByEmailRepository.user = {
    password: 'hashed_password'
  }
  return loadUserByEmailRepository
}

const makeSut = () => {
  const encryptSpy = makeEncypter()
  const loadUserByEmailRepository = loadUserByEmailRepositorySpy()
  const sut = new AuthUseCase(loadUserByEmailRepository, encryptSpy)
  return {
    sut,
    loadUserByEmailRepository,
    encryptSpy
  }
}
describe('Auth UseCase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadUserByEmailRepository.email).toBe('any_email@mail.com')
  })

  test('Should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@mail.com', 'any_password')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth('any_email@mail.com', 'any_password')
    expect(promise).rejects.toThrow()
  })

  test('Should returns null if an invalid email is provided', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    loadUserByEmailRepository.user = null
    const accessToken = await sut.auth('invalid_email@mail.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should returns null if an invalid password is provided', async () => {
    const { sut, encryptSpy } = makeSut()
    encryptSpy.isValid = false
    const accessToken = await sut.auth('valid_email@mail.com', 'invalid_password')
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct values', async () => {
    const { sut, loadUserByEmailRepository, encryptSpy } = makeSut()
    await sut.auth('valid_email@mail.com', 'any_password')
    expect(encryptSpy.password).toBe('any_password')
    expect(encryptSpy.hashedPassword).toBe(loadUserByEmailRepository.user.password)
  })
})
