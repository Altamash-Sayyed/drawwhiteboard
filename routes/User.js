const express = require('express')
 const {User,validate} =require('../models/UserModel.js')
const bcrypt = require('bcrypt')

const router = express.Router()


router.post('/register',async(req,res)=>{

    try {
        const {name,email,password} =req.body

        if(!name||!email||!password) return res.send("all field required")
        const {error} =  validate({name,email,password})

        if(error) return res.send({msg:error.message})
        
        const user =await User.findOne({email:req.body.email})
        if(user) return res.send({msg:"User Exist!"})
        
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(req.body.password,salt)
        console.log(1)
       const savedUser = await new User({name,email,password:hash}).save()

        res.status(202).send(savedUser)
    } catch (error) {
         res.send(error.message)
        
    }

})



module.exports = router
