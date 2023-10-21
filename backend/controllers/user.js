const User = require("../models/User");
const Post=require("../models/Post");
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
           return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        user = await User.create({
            name, email, password
            , avtar: {
                public_id: "sample_id",
                url: "sample url"
            }
        })

        res.status(200).json({
            success:true,
            message:"User registered successfully",
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `can't register user due to ->${err.message}`,
        })
    }
}

exports.login=async(req,res,next)=>{
   try{
    const {email,password}=req.body;
  
    if(!email || !password){
        res.status(401).json({
            success:false,
            message:"all fields are required"
        })
    }
    const user=await User.findOne({email}).select("+password");
   
    if(!user){
        res.status(400).json({
            success:false,
            message:"User doesn't exists please register",
            
        })
    }
       
        const isMatch=await user.matchPassword(password,user.password);
     
        if(!isMatch){
            res.status(402).json({
                success:false,
                message:"Password is incorrect",
          
               
            })
        }
        const token=await user.generateToken();

        res.status(201).cookie("token",token,{
            expires:new Date(Date.now()+90*24*60*60*1000)//expires after 90 days
            ,
            httpOnly:true
        }).json({
            success:true,
            message:"User loggedin successfully",
            user,
            token,
        })
    
   }catch(err){
    res.status(500).json({
        success:false,
        message: `can't login user due to ->${err.message}`
    })
   }
}


exports.followUser=async(req,res,next)=>{
    try{


        if(!req.params.id){
            return res.status(401).json({
                success:false,
                message:"can;t get id of user",
            })
        }
       
        const usertoFollow=await User.findById(req.params.id);
        const loggedInUser=await User.findById(req.user._id);
      
        if(!usertoFollow){
            return res.status(400).json({
                success:false,
                message:"User not found",
            })
        }
        if(loggedInUser.followings.includes(usertoFollow._id)){
            const indexofuser=loggedInUser.followings.indexOf(usertoFollow._id);
            loggedInUser.followings.splice(indexofuser,1);
            const indexofLoggedInUser=usertoFollow.followers.indexOf(loggedInUser._id);
            usertoFollow.followers.splice(indexofLoggedInUser,1);
            await loggedInUser.save();
            await usertoFollow.save();

            res.status(201).json({
                success:true,
                message:"user unfollowed",
            })
            
        }else{

            loggedInUser.followings.push(usertoFollow._id);
            usertoFollow.followers.push(loggedInUser._id);
    
            await loggedInUser.save();
            await usertoFollow.save();
    
            res.status(201).json({
                success:true,
                message:"User followed"
            })
    
        }

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}



exports.logout=async(req,res,next)=>{
    try{

        res.status(200).cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
        }).json({
            success:true,
            message:"user logged out successfully"
        })
    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}


exports.updatePassword=async(req,res,next)=>{
    try{
     const user=await User.findById(req.user._id).select("+password");
    
     const {oldPassword,newPassword}=req.body;
     if(!oldPassword || !newPassword){
        res.status(401).json({
            success:false,
            message:"all fields are required"
        })
     }
     const isMatch=await user.matchPassword(oldPassword,user.password);
     if(!isMatch){
        return res.status(401).json({
            success:false,
            message:"incorrect old password"
        })
     }

     user.password=newPassword;
     await user.save();
     res.status(201).json({
        success:true,
        message:"Password Updated"
     })

    }catch(err){
        res.status(401).json({
            success:false,
            message:err.message
        })
    }
}

exports.updateProfile=async(req,res,next)=>{
    try{

        const user=await User.findById(req.user._id);
        const {name,email}=req.body;
        if(!name || !email){
            return res.status(401).json({
                success:false,
                message:"all fields are required"
            })
        }
        if(name){
            user.name=name;

        }
        if(email){
            user.email=email;
        }

        await user.save();
        res.status(201).json({
            success:true,
            message:"profile updated",
        })
    }catch(err){
        res.status(401).json({
            success:false,
            message:err.message
        })
    }
}

exports.deleteMyProfile=async(req,res,next)=>{
    try{

        const user=await User.findById(req.user._id);
        const posts=user.posts;
        const followers=user.followers;
        const following=user.followings;
       const userId=user._id;
      
        await user.deleteOne();

        //logging out user after deleting profile
        
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
        })
   
        //deleting each posts of user
        for(let i=0;i<posts.length;i++){
           
            const post=await Post.findById(posts[i]);
         
            await post.deleteOne();
          

          
        }

        //deleting user from followers following's
       
        for(let i=0; i<followers.length;i++){
            const follower=await User.findById(followers[i]);
            const index=follower.followings.indexOf(userId);
            follower.followings.splice(index,1);//removing user id from follower following's
           await follower.save();
        }
      
        //deleting user from following's follower's
        for(let i=0; i<following.length;i++){
            const follows=await User.findById(following[i]);
           
            const index=follows.followers.indexOf(userId);
            
            follows.followers.splice(index,1);//removing user id from follower following's
          
            await follows.save();
        }
        
        res.status(201).json({
            success:true,
            message:"profile deleted susccessfully"
        })

    }catch(err){
        res.status(402).json({
            success:false,
            message:err.message
        })
    }
}

exports.myProfile=async(req,res,next)=>{
    try{

        const user=await User.findById(req.user._id).populate("posts");
        if(!user){
            res.status(401).json({
                success:false,
                message:"user doesn't exists can't get profile details"
            })
        }

        res.status(201).json({
            success:true,
            user,
        })

    }catch(err){
        res.status(401).json({
            success:false,
            message:err.message
        })
    }
}

exports.getUserProfile=async(req,res,next)=>{
    try{
    const user=await User.findById(req.params.id).populate("posts");
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found",
        })
    }

    res.status(201).json({
        success:true,
        user,
    })

    }catch(err){
        res.status(501).json({
            success:false,
            message:err.message
        })
    }
}


exports.getAllUsers=async(req,res)=>{
    try{

    const users=await User.find({});

     res.status(201).json({
        success:true,
        users
    })

    }catch(err){
        res.status(501).json({
            success:false,
            message:err.message
        })
    }
}