
import express from 'express';
import { changePassword, createUser, userSignIn } from '../controllers/user.mjs';
import { validateUserSignUp, uservalidation, validateUserSignIn, ValidateChangePassword } from '../validation/user.mjs';

const router = express.Router();

router.get('/', (req, res) => {
   return res.json({success:true ,message:'welcome to backend zone!'});
  });

router.post('/create-user', validateUserSignUp, uservalidation, createUser,(req,res)=>{
   return res.json({success:true ,message:'backend is listening'});
   })

router.post('/signUp', validateUserSignIn, uservalidation, userSignIn,(req,res)=>{
   return res.json({success:true ,message:'Enter the Login Page'});
});

router.patch('/changePassword',changePassword,(req,res)=>{
   return res.json({success:true ,message:'updated successfully'});
});

export default router;













// const express=require('express');


// const router=express.Router();
// const {createUser, userSignIn, createUsers}= require('../controllers/user');
// const { validateUserSignUp, uservalidation } = require('../validation/user');

// router.post('/create-user',validateUserSignUp,uservalidation,createUser);
// router.post('/signUp',validateUserSignUp,uservalidation,userSignIn)
// module.exports=router;
// router.route("/").post(createUsers)











































// const express=require('express');

// const router=express.Router();
// const {createUser,userSignIn}=require('../controllers/user');
// const{validateUserSignUp,userValidation}=require('./validation/user');


// router.post ('/create-user',validateUserSignUp,userValidation,createUser);
// router.post('/sign-in',validateUserSignUp,userValidation,userSignIn);
//  router.post('/create-post',isAuth,(req,res) => {

//          res.send(' welcome you are in secret route');
    
//  });


// module.exports=router;