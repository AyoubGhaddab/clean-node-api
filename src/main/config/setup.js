const cors = require('../middlewares/cors')
const JsonParser = require('../middlewares/json-parser')
const contentType = require('../middlewares/content-type')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(JsonParser)
  app.use(contentType)
}
