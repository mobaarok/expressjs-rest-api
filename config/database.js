//Databes Connection Config:

const mongoose = require('mongoose')
//connect to database
mongoose.connect('mongodb://localhost/mobx', { useNewUrlParser: true, useUnifiedTopology: true })

//check the connection
const db = mongoose.connection
db.on('error', (err) => {
  console.log(err)
})
db.once('open', function () {
    console.log("we're connected!")
})