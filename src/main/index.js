const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')
MongoHelper.connect(env.mongoUrl).then(() => {
  const app = require('./config/app')
  app.listen(env.port, () => {
    console.log(`Server is running at http://localhost:${env.port}`)
  })
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error)
  process.exit(1)
})
