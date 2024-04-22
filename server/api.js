const { MongoClient, ServerApiVersion } = require('mongodb'),
      uri = 'mongodb+srv://cscott53:mernStack1@cluster0.wscobq0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      client = new MongoClient(uri, {
          serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
          }
      }),
      express = require('express'),
      router = express.Router()
async function run() {
  try {
    await client.connect()
    console.log(await client.db().admin().listDatabases())
    // let db = await client.db('admin')
    // await client.db('admin').command({ ping: 1 })
    // console.log('Pinged your deployment. You successfully connected to MongoDB!')
  } finally {
    await client.close()
  }
}
run().catch(console.dir)
