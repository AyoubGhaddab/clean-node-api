const { adapt } = require('../adapters/express-router-adapter')

const LoginRouterComposer = require('../composers/login-router-composer')
module.exports = async router => {
  router.post('/login', adapt(LoginRouterComposer.compose()))
}
