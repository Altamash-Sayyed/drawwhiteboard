const express = require('express')
 const {User} =require('../models/UserModel.js')
 const bcrypt = require('bcrypt')
 const joi = require('joi')
 const joipasswordcomplexity = require('joi-password-complexity')


 const router = express.Router()

 router.post('/login',async(req,res)=>{

    try {
        
    
    const {error} =validate(req.body)

    if(error) return res.status(403).send(error.message)

    const user = await User.findOne({email:req.body.email})

    if(!user) return res.status(403).send({msg:"User Not Found"})

    const compare = await bcrypt.compare(req.body.password,user.password)

    if(!compare) return res.status(403).send({msg:"Give correct credentials"})

    const token = await user.generateAuthToken()

    res.status(202).send(token)
} catch (error) {
    res.status(403).send(error.message)

}
 })

 const validate = (data)=>{
     const schema = joi.object({
         email:joi.string().email().required().label("email"),
         password:joipasswordcomplexity().required().label("password")
     })
     return schema.validate(data)
 }

 module.exports = router