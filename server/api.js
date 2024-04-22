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
(async()=>await client.connect())()
router.get('/users',async({query},res)=>{
    try {
        let {username,password} = query,
            db = client.db('admin'),
            user = await db.collection('users')
            .findOne({username})
        res.send((user?true:false) && user.password == password)
    } catch (error) {
        console.dir(error)
    }
})
module.exports = router