const express = require('express'),
      path = require('path'),
      port = process.env.PORT || 3000,
      app = express(),
      router = require('./api')
app.use(express.json())
app.use('/api',router)
app.use(express.static(path.join(__dirname,'../client/build')))
app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'../client/build/index.html')))
app.listen(port,()=>console.info(`Server running at port ${port}`))