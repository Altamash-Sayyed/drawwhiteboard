const mongoose = require('mongoose')
const joi = require('joi')
const joipasswordcomplexity = require('joi-password-complexity')
const jwt = require('jsonwebtoken')

const userschema = mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
},
})


userschema.methods.generateAuthToken = function(){
const token = jwt.sign({_id:this._id},process.env.JWTSECRET,{
    expiresIn:"7d"
})
return token
}

const User = mongoose.model('user',userschema)

const validate=(data)=>{
const schema =joi.object({
name:joi.string().required().label("name"),
email:joi.string().email().required().label("email"),
password:joipasswordcomplexity().required().label("password")
})
return schema.validate(data)
}

module.exports = { User, validate };