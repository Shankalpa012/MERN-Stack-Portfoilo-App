const express = require("express");
const route = express.Router();
const auth=require("../middlerware/auth")
const {check, validationResult}= require("express-validator") 
//importing the  Modles
const Profile= require("../modles/ProfileModel");
const User= require("../modles/User")



//@route == routes/profile

//@description Test route

//@access public (doesnot need a token to access)

//this is checking if there is user profile or not
route.get("/me",auth, async (req,res)=>{
    try {
        //finding the data from the user and profile usermodel
       const profile= await Profile.findOne({user:req.user.id}).populate("user",["username","avatar"]);

       //checking if profile exixts
       if(!profile){
            return res.status(400).json({   msg:"There is no profile for the Current User"    })
       }

       res.json(profile)


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error!!!")
    }
})

//this is for the updating and creating the user profile

route.post("/", 
    [ auth ,
        check("status","Enter You Job Status").not().isEmpty(),
        check("skills","Skills is requiered").not().isEmpty()
    ],

    async (req, res)=>{ 
        //checking if there are any errors during the data cavalidation
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
    
        //getting the data from the request body
        const {
            company,
            status,
            skills,
            bio,
            githubusername,
            youtube,
            twitter,
            linkedin,

        } = req.body


        //creating a users profile object

        let profileFields = {};
        profileFields.user=req.user.id          
        if(company)  profileFields.company = company;
        if(status)  profileFields.status = status;
        if(bio)  profileFields.bio = bio;
        if(githubusername)  profileFields.githubusername = githubusername;
        if(skills){
            profileFields.skills= skills.split(",").map(skill=>skill.trim())
        }

        //insilizing the social object inside the profileField Object
        profileFields.social = {}
        if(youtube)  profileFields.social.youtube = youtube;
        if(twitter)  profileFields.social.twitter = twitter;
        if(linkedin)  profileFields.social.linkedin = linkedin;

        try{
            //Finding the user Profile from user id
           profile= await Profile.findOne({user:req.user.id})

            //checking if the user provile is availabe or not
            if(profile){
                //updating the userdata
                profile=await Profile.findOneAndUpdate(
                    { user:req.user.id },
                    { $set:profileFields },
                    { new:true }
                )

                return res.send(profile)
            }

            //creating the new user
            profile= new Profile(profileFields);

            await profile.save()
            res.json(profile)

        }catch(error){
            console.error(error.message);
            res.status(500).send("Server Error!!!!")
        }
})


//this is for getting all the user profile
route.get("/",
    async (req,res)=>{
        try {
            //getting all the pofiles 
            const profile = await Profile.find().populate(["user","username,avatar"])
            res.json(profile)
        } catch (error) {
            console.log(error.message)
            res.status(500).send("server Errror!!!")
        }
})

//this is for getting specific user profile
route.get("/user/:user_id",
    async (req,res)=>{
        try {
            //geetting specific profile on the basic of userid
            const profile = await Profile.findOne({ user: req.params.user_id }).populate(["user","username,avatar"])

            //checking if the particular user exists
            if(!profile){
                return res.status(400).json({  msg:"No Profile was found "  }) 
            }

            res.json(profile)
        } catch (error) {
            console.log(error.message)
            if(error.kind == "ObjectId"){
                return res.status(400).json({  msg:"No Profile was found "  }) 
            }
            res.status(500).send("server Errror!!!")
        }
})


//delete the users profile and user data
route.delete("/", auth,
    async (req,res)=>{
        try {
            //delete users posts
            
            //Deleting the user profile
            await Profile.findOneAndRemove({  user:req.user.id });

            //deleting the given user
            await User.findOneAndRemove({_id: req.user.id})
            
            res.json({ msg: "User Deleted!!!"})
        } catch (error) {
            console.log(error.message)
            res.status(500).send("server Errror!!!")
        }
})

module.exports= route;