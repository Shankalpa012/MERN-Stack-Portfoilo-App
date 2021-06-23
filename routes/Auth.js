const express = require("express");
const route = express.Router();
const auth=require("../middlerware/auth")
const User=require("../modles/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config=require("config")
const {check, validationResult}= require("express-validator")


//@route == routes/auth

//@description Test route

//@access public (doesnot need a token to access)

route.get("/", auth ,async (req,res)=>{
    try {
        const user= await User.findById(req.user.id).select("-password");
        res.json(user)
    } catch (error) {
        console.log(error.message)
        req.status(500).send("server Error!!!")
    }
    

})

//for login the user
route.post("/", 
    [
        check("email","Please include a Email").isEmail(),
        check("password","add the correct password").exists()
    ],
    async (req,res)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty(0)){
            return res.status(400).json({errors: errors.array()})
        }
        //getting the userdata from body
        let {email, password } = req.body

        try {

            let user = await User.findOne({ email })

            if(!user){
                res.status(400).json({errors:[{msg:"Invalid Email or Password"}]});
            }

            let passwordMatch= await bcrypt.compare(password,user.password)

            if(!passwordMatch){
                res.status(400).json({errors:[{msg:"Invalid Email or Password"}]});
            }

            //jwt web token
            const payload={
            user:{
                id:user.id
            }
            }

            jwt.sign(payload,config.get('jwtSecret'),{expiresIn:36000},
            (err,token)=>{
                if(err) throw err;
                res.json({token})
            })
            

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error!!!!!")
        }

})

module.exports= route;