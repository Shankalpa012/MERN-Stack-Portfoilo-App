const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    text:{
        type:String,
        required:true
    },
    username:{
        type:String,
    },
    avatar:{
        type:String,
    },
    likes:[  
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            },
        
        }
    ],
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            },
            text:{
                type:String,
            },
            username:{
                type:String,
            },
            avatar:{
                type:String,
            },
            data:{
                type:Date,
                default:Date.now
            }
        }
    ],
    data:{
        type:Date,
        default:Date.now
    }
})

module.exports = posts= mongoose.model("posts",PostSchema);