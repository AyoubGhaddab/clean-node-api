const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri) {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
    this.db = this.client.db()
  },
  async disconnect () {
    await this.client.close()
    this.client = null
    this.db = null
  },
  async getCollection (name) {
    if (!this.client || !this.client.topology || !this.client.topology.isConnected()) {
      await this.connect(this.uri)
    }
    return this.db.collection(name)
  }
}
