const express = require('express')
const cors = require('cors')
const connect = require('./Db')
require('dotenv').config()


const app =express()
const uri = process.env.MONGO_URI
connect(uri)
app.use(express.json())
app.use(cors())
app.use('/api/user',require('./routes/User.js'))
app.use('/api/user',require('./routes/Auth.js'))



app.listen(process.env.PORT|| 8000,()=>console.log('app is listen on http://localhost:8000'))