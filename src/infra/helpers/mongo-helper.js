const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri, dbName) {
    this.uri = uri
    this.dbName = dbName
    this.client = await MongoClient.connect(uri)
    this.db = this.client.db(dbName)
  },
  async disconnect () {
    await this.client.close()
    this.client = null
    this.db = null
  },
  async getCollection (name) {
    if (!this.client || !this.client.topology || !this.client.topology.isConnected()) {
      await this.connect(this.uri, this.dbName)
    }
    return this.db.collection(name)
  }
}
