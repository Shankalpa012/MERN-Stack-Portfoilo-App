const auth=require("../middlerware/auth")
const {check, validationResult}= require("express-validator") 
//importing the  Modles
const Profile= require("../modles/ProfileModel");
const User= require("../modles/User")
const Post = require("../modles/PostModle") 

//this method is to save the post
exports.savepost = async (req,res)=>{
    //checking for any validation errors
    const errors = validationResult(req);
    //if errors are found than a res is send
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        //finding the user we want to seve the post
        const user = await User.findById( req.user.id ).select("-password")
        //creatin post object that is going to be send
        const newPost = new Post({
            text:req.body.text,
            username:user.username,
            avatar:user.avatar,
            user:req.user.id
        })

        const post = await newPost.save()
        res.json(post);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("server Errror!!")
    }
}

exports.deletePost= async (req,res)=>{
    try {
        
        //getting the post that you want to delete
       const post = await Post.findById(req.params.id);

       if(!post){
           return res.status(400).json( {   msg:"no post was found" }   )
       }

       if(post.user.toString() !== req.user.id){ 
            return res.status(400).json( {   msg:"User is Not Authorized" }   )
       }
       
       await post.remove()

       res.json({  msg:"post was removed"  })

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error!!!!")
    }

}


//get all the posts
exports.getAllPosts= async (req,res)=>{
        try {
            //geetting specific posts 
            const posts = await Post.find()

            res.json(posts)
        } catch (error) {
            console.log(error.message)
            if(error.kind == "ObjectId"){
                return res.status(400).json({  msg:"No posts was found "  }) 
            }
            res.status(500).send("server Errror!!!")
        }
}


exports.getPost= async (req,res)=>{
    try {
        //geetting specific posts 
        const posts = await Post.findById( req.params.id )

        if(!posts){
            return res.status(400).json({  msg:"No Posts was found "  }) 
        }

        res.json(posts)
    } catch (error) {
        console.log(error.message)
        if(error.kind == "ObjectId"){
            return res.status(400).json({  msg:"No posts was found "  }) 
        }
        res.status(500).send("server Errror!!!")
    }
}

//this is to like the post done by the user
exports.likePost = async (req,res) => {
    try {
        
        //get the post that you want to like
        const post = await Post.findById(req.params.id);

        //checking id the user has already liked the post
        const checkedValue = post.likes.filter( (like)=>{ return like.user.toString() === req.user.id} ) 

            //after filering the value retured is 1 
        if( checkedValue.length > 0 ){
            return res.status(400).json({ msg:"Already Liked the video!!!" })
        }


        //adding the id of user that liked the profile to the post model
        post.likes.unshift({ user : req.user.id })

        await post.save()

        res.json( post.likes)

    } catch (error) {
        console.log(error.message)
        res.status(501).send("Server Error!!!");
    }
}

//this is to unlike the post done by the user
exports.unlikePost = async (req,res) => {
    try {
        
        //get the post that you want to like
        const post = await Post.findById(req.params.id);

 
        //checking id the user has already liked the post
        if( post.likes.filter(like=>{ return like.user.toString() === req.user.id }).length === 0 ){
            return res.status(400).json({ msg:"post has not been liked yet!!!" })
        }

       
        //adding the id of user that liked the profile to the post model
       const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        //removing the like from the user index and number of index that i want to delete
        post.likes.splice(removeIndex,1)

        await post.save()

        res.json( post.likes)

    } catch (error) {
        console.log(error.message)
        res.status(501).send("Server Error!!!");
    }
}


//this is for adding the comment on the post
exports.addComment = async (req,res) => {
    //this is validating the req body
    const errors = validationResult(req);
    //if errors are found than a res is send
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        
        //get the post that is comment
        const post = await Post.findById(req.params.id);

        //get the user that has liked the post
        const user = await User.findById( req.user.id ).select("-password")

        const newComment= {
            text:req.body.text,
            user: req.user.id,
            avatar: user.avatar,
            username:user.username
        }

        //adding the id of user that liked the profile to the post model
        post.comments.unshift(newComment)

        await post.save()

        res.json( post.comments)

    } catch (error) {
        console.log(error.message)
        res.status(501).send("Server Error!!!");
    }
}


exports.deleteComment = async (req,res) => {
    try {
        
        //get the post that you want to like
        const post = await Post.findById(req.params.id);

        //get the comment on tha basic of that comment id
        const comment = await post.comments.find( comment => comment.id === req.params.comment_id )

      
        //checking if there is comment or not
        if(!comment){
            return res.status(400).json({ msg:"There are no Comments!!!!" })
        }
    

        //checking id the user has already liked the post
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({ msg:"No Authorization!!" })
        }

        
        //adding the id of user that liked the profile to the post model
       const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        //removing the like from the user index and number of index that i want to delete
        post.comments.splice(removeIndex,1)

        await post.save()

        res.json( post.comments)

    } catch (error) {
        console.log(error.message)
        res.status(501).send("Server Error!!!");
    }
}






