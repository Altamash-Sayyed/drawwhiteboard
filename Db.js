const mongoose = require('mongoose')

const URI = process.env.MONGO_URI
const connect =(uri)=>{
     mongoose.connect(uri,{
         useNewUrlParser:true,
         useUnifiedTOpology:true
     }).then(()=>{
        console.log("DB Connect...")
     }).catch((err)=>{
        console.log(err)
     })
}

module.exports= connect