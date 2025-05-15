const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')
MongoHelper.connect(env.mongoUrl).then(() => {
  const app = require('./config/app')
  app.listen(5858, () => {
    console.log('Server is running on port 5858')
  })
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error)
  process.exit(1)
})
