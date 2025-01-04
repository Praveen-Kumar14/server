
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
