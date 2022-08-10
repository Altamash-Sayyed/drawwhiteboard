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

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
    const path = require("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
  }

app.listen(process.env.PORT|| 8000,()=>console.log('app is listen on http://localhost:8000'))