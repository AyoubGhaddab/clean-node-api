module.exports = router => {
  router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
  })
  router.post('/login', (req, res) => {
    res.status(200).json({ status: 'ok' })
  })
}
