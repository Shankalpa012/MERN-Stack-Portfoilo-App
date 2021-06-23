const express = require("express");
const route = express.Router();
const {check, validationResult}= require("express-validator")
const gravatar = require("gravatar")
const User = require("../modles/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config=require("config")

//@route post api routes/user

//@description Test route

//@access public (doesnot need a token to access)

route.post("/",
    [
        check("username","Name is Require").not().isEmpty(),
        check("email","Please include a Email").isEmail(),
        check("password","add the password longer than 6 digits").isLength({min:6})
    ],
    async (req,res)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty(0)){
            return res.status(400).json({errors: errors.array()})
        }
        //getting the userdata from body
        let { username, email, password } = req.body

        //checking if the user exists
        try {

            let user = await User.findOne({ email })

            if(user){
                res.status(400).json({errors:[{msg:"User Already Exists!!!!"}]});
            }

                //greating a gravatar for the user profile
            const avatar= gravatar.url(email,{
                s:"200",
                r:"pg",
                d:"mm"
            })

            //creating a new instance for each new user
            user = new User({
                email,
                password,
                username,
                avatar,
            })
 
            //hasing the password
            //creating salt
            const salt= await bcrypt.genSalt(10);

            //hasing the password
            user.password = await bcrypt.hash(password, salt);

            await user.save()

            //jwt web token
            const payload={
            user:{
                id:user.id
            }
            }

            //creating a web token
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