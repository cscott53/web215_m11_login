const express = require('express'),
      path = require('path'),
      port = process.env.PORT || 3000,
      app = express()
app.use(express.static(__dirname))
app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'index.html')))
app.listen(port,()=>console.info(`Server running at port ${port}`))