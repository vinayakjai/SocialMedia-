const express=require("express");
const { register, login, followUser, logout, updatePassword, updateProfile, deleteMyProfile, myProfile, getUserProfile, getAllUsers } = require("../controllers/user");
const { isLogin } = require("../config/middleware/authMiddleware");

const router=express.Router();
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/follow/:id').get(isLogin,followUser);
router.route('/logout').get(logout);
router.route('/update/password').put(isLogin,updatePassword);
router.route('/update/profile').put(isLogin,updateProfile);
router.route('/delete/me').delete(isLogin,deleteMyProfile);
router.get('/me',isLogin,myProfile);
router.route('/user/:id').get(isLogin,getUserProfile);
router.route('/users').get(getAllUsers);
module.exports=router;