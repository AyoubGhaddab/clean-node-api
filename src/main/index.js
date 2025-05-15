const app = require('./config/app')

app.get('/api/mango', (req, res) => {
  res.send('mango')
})
app.listen(5858, () => {
  console.log('Server is running on port 5858')
})
