
const Post = require("../models/Post.js")

const User = require('../models/User.js');

exports.createPost = async (req, res, next) => {
    try {

        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: "jaa",
                url: "ncak",
            },
            owner: req.user._id,


        }

        const newPost = await Post.create(newPostData);

        const user = await User.findById(req.user._id);
        user.posts.push(newPost._id);
        await user.save();
        res.status(201).json({
            success: true,
            message: "post create succesfuly",
            newPost
        });


    } catch (err) {
        res.status(400).json({
            success: false,
            message: `->${err.message}`
        })
    }
}

exports.likeandUnlikePost = async (req, res, next) => {
    try {
        //for like-->
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "post not found",
            })
        }
        if (post.likes.includes(req.user._id)) {
            const indexofuser = post.likes.indexOf(req.user._id);

            post.likes.splice(indexofuser, 1);//deleting that user from likes array
            await post.save();
            return res.status(201).json({
                success: true,
                message: "post unliked",
            })
        }
        else {

            post.likes.push(req.user._id);

            await post.save();

            return res.status(201).json({
                success: true,
                message: "Post liked",
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

exports.deletePost = async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(500).json({
            success: false,
            message: "post doesn't exists",
        })
    }


    if (post.owner.toString() !== req.user._id.toString()) {
        return res.status(502).json({
            success: false,
            message: "unauthorized User",
        })
    }

    await post.deleteOne();
    const user = await User.findById(req.user._id);
    const indexofPost = user.posts.indexOf(req.params._id);

    user.posts.splice(indexofPost, 1);//deleting that post from user's post array also
    await user.save();
    res.status(201).json({
        success: true,
        message: "post deleted",
    })


}

exports.getPostofFollowing = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id)
        const posts = await Post.find({
            owner: {
                $in: user.followings
            }
        });

        res.status(201).json({
            success: true,
            posts,
        })



    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}
exports.updateCaption = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!req.body.caption) {
            return res.status(400).json({
                success: false,
                message: "please enter new caption"
            })
        }
        if (!post) {
            res.status(401).json({
                success: false,
                message: "post not found"
            })
        }
        if (post.owner._id.toString() !== req.user._id.toString()) {
            res.status(402).json({
                success: false,
                message: "unauthorizes User",
            })
        }
        post.caption = req.body.caption;
        await post.save();
        res.status(200).json({
            success: true,
            message: "post updated"
        })

    } catch (err) {
        res.status(403).json({
            success: false,
            message: err.message
        })
    }
}


exports.commentOnPost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(401).json({
                success: false,
                message: "post not found"
            })
        }

        let commentIndex = -1;
        post.comments.forEach((comment, index) => {
            if (comment.user.toString === req.user._id.toString()) {
                commentIndex = index;
            }
        })
        if (commentIndex !== -1) {

            post.comments[commentIndex].comment = req.body.comment;//updating existing comment of user
            await post.save();
            res.status(201).json({
                success: true,
                message: "comment updated"
            })

        } else {
            post.comments.push({//adding comment of user
                user: req.user._id,
                comment: req.body.comment,
            })
            await post.save();
            return res.status(201).json({
                success: true,
                message: "comment added"
            })

        }
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}


exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.body;

        if (!commentId) {
            return res.status(401).json({
                success: false,
                message: "plz mention commentId"
            })
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(401).json({
                success: false,
                message: "post not found"
            })
        }

        if (post.owner.toString() === req.user._id.toString()) {

            post.comments.forEach((comment, index) => {

                if (comment._id.toString() === commentId.toString()) {
                    post.comments.splice(index, 1);
                    return
                }
            })

            await post.save();
            res.status(200).json({
                success: true,
                message: "selected comment deleted",
            })
        } else {




            let isDeletingOthersComment = "true";
            post.comments.forEach(async (comment, index) => {


                if (comment.user.toString() === req.user._id.toString() && comment._id.toString() === commentId.toString()) {

                    isDeletingOthersComment = "false"
                   
                    post.comments.splice(index, 1);
                     await post.save();
                   
                    
                        res.status(201).json({
                            success: true,
                            message: "your comment deleted"
                        })
                }

            })
           
          
            
              if(isDeletingOthersComment==="true"){
                 res.status(401).json({
                    success:false,
                    message:"can't delete comment of others"
                 })
              }
            






        }



    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}