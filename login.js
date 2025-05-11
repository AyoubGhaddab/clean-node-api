const express = require('express')
const router = express.Router()

// 1. Presentation Layer (Express + Adapter)
module.exports = () => {
  const signUpRouter = new SignUpRouter()
  router.post('/signup', new ExpressRouterAdapter().adapt(signUpRouter))
}

class ExpressRouterAdapter {
  static adapt (route) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await route.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

// 2. Route Layer (Controller)
class SignUpRouter {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    const user = await new SignUpUseCase().SignUp(email, password, repeatPassword)
    return {
      statusCode: 200,
      body: user
    }
  }
}
// 3. Use Case Layer (Application Logic)
class SignUpUseCase {
  async SignUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      return await new AddAccountRepository().SignUp(email, password)
    }
  }
}
// 4. Infrastructure Layer (Database)
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAccountRepository {
  async SignUp (email, password) {
    const user = await AccountModel.create({
      email,
      password
    })
    return user
  }
}
