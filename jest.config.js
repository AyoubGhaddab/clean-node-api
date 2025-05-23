const config = {
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**'],
  preset: '@shelf/jest-mongodb'

}

module.exports = config
