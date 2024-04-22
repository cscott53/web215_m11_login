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
      router = express.Router();
/*
I usually don't use semicolons but had to put one on
the line above since JS thought the () on the line
below was trying to call what was returned on the
line above and threw an error
*/
(async()=>await client.connect())()
router.get('/users',async({query},res)=>{
    try {
        let {username,password} = query,
            db = client.db('test'),
            user = await db.collection('users')
            .findOne({username})
        res.send((user?true:false) && user.password == password)
    } catch (error) {
        console.dir(error)
    }
})
router.post('/users',async({body},res)=>{
    let {email,username,password} = body
    try {
        let db = client.db('test'),
            users = db.collection('users'),
            user = await users.findOne({username})
        if(user) res.send('User already exists')
        else {
            await users.insertOne({email,username,password})
            res.send('Account created successfully')
        }
    } catch (error) {
        console.dir(error)
    }
})
module.exports = router