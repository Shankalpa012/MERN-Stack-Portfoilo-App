const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    company:{
        type:String,
    },
    status:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
    },
    bio:{
        type:String,
    },
    githubusername:{
        type:String,
    },
    experience:[
        {
            title:{
                type:String,
                required:true
            },
            company:{
                type:String,
                required:true
            },
            title:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            },
            

        }
    ],
    social:{
        youtube:{
            type:String
        },
        twitter:{
            type:String
        },
        linkedin:{
            type:String
        },
    }
    
})

module.exports= Profile=mongoose.model("profile",ProfileSchema);