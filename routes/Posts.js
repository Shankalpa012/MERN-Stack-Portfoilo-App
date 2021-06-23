const express = require("express");
const route = express.Router();
const auth=require("../middlerware/auth")
const {check, validationResult}= require("express-validator") 
const { savepost, deletePost, getAllPosts,getPost, likePost,unlikePost, addComment, deleteComment } = require("../Controller/PostsController")
//importing the  Modles
const Profile= require("../modles/ProfileModel");
const User= require("../modles/User")
const Post = require("../modles/PostModle") 

//@route == routes/posts

//@description Test route

//@access public (doesnot need a token to access)

route.post("/",
    [
        auth,
        check("text","There should be text available").not().isEmpty()
    ],
    savepost
)

route.delete("/:id",auth, deletePost);
route.get("/",auth,getAllPosts);
route.get("/:id",auth,getPost);
route.put("/like/:id",auth,likePost);
route.put("/unlike/:id",auth,unlikePost);

route.post("/comments/:id",
    [
        auth,

        check("text","Add The comment before submitting").not().isEmpty()
    ],
    addComment

)

route.delete("/comments/:id/:comment_id",auth,deleteComment)

module.exports= route;