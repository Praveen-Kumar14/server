// controllers/user.mjs
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';
// import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  const { email, password, confirmPassword, Roll_No, studentPhoneNo, parentMobileNo, batch } = req.body;
  console.log(req.body);
  try{
  const isNewUser = await User.findOne({email})

  if (isNewUser) {
    return res.json({
      error: 'This email is already in exits! Enter new email  .',
    });
  } 

//  const hashedPassword=await bcrypt.hash(password,10);
  const user = new User({
    email,
    password,
    confirmPassword,
    Roll_No,
    studentPhoneNo,
    parentMobileNo,
    batch,
  });

  await user.save();
  res.json({message: 'Account Created SuccessFully'});
}
catch(error){
  return res.json({error:'intrenal server error'});
}
  };
  
export const userSignIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try{
  const user = await User.findOne({ email }).select('+password');
  if (!user) {    
    return res.json({ error: 'Email not found'});
  } 


  //const isMatch = await bcrypt.compare(password, user.password);
  const isMatch = await user.comparePassword(password);
  
  console.log(isMatch);
  console.log(user.password);
  if(user.password!==password){
    console.log(password);
  }
  if (isMatch) {
    const token = jwt.sign({ userId: user._id }, 'VERYsecret123', { expiresIn: '1d' });
    res.json({ success: true, user, token ,message:'Login successfully',parentMobileNo:user.parentMobileNo});
  }else{
  return res.json({error: 'password does not match!'});
  }
  }
  catch(error){
    console.log(error);
    return res.json({error:'internal server error'});
  }
};

export const createUsers = async (req, res) => {
  console.log(req.body);
  const data = await User.create(req.body);
  res.json({ msg: 'Data received', users: data });
};


export const changePassword = async (req, res) => {
  const {email,Roll_No,password,confirmPassword}=req.body;
  try {
    const user=await User.findOne({email});
    if(!user){
      res.json({error:'Mail is not in use'});
    }
    if(user.password===password){
      res.json({error:'password is already in use '});
    }
    if(user.Roll_No===Roll_No){
      user.password=password;
      user.confirmPassword=confirmPassword;
    }
    // const newPassword = await Password.findByEmailAndUpdate(
    //   { email: req.body.email }, // Assuming email is the field to search for
    //   { $set: req.body }, // Assuming req.body contains the new password details
    //   { new: true }
    // );

    await user.save();
    return res.json({ message: 'Password updated successfully', password });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

    // const {Roll_No,email,password,confirmPassword}=req.body
    // try {
    //   const user=await User.findOne({ Roll_No}).select('+email');
    //   if(!user){
    //     return res.json({error:'Roll No does not match'});
    //   }

    //   const Match=await user.compareEmail(email);
    //   if(!Match){
    //     return res.json({error:'email not suite with registered RollNo'})
    //   }

    //   user.password=password,
    //   user.confirmPassword=confirmPassword;

    //   await user.save();
    //   res.json({message:'password updated successfully'})
    // } catch (error) {
    //   return res.json({error:'internal server error'});
    // }

export default {
  createUser,
  userSignIn,
};






































// const jwt=require('jsonwebtoken');
// const User=require('../models/user');

// exports.createUser=async(req,res)=>{
//    const {email,password,confirmPassword,studentPhoneNo,parentPhoneNo,batch}=req.body
//    const isNewUser=await User.findOne(email);
//    if(!isNewUser)
//    return res.json({
// success:false,
// message:'this email is already in use,try sign in',
// });

//     const user= User({ 
//       email,
//       password,
//        confirmPassword,
//        studentPhoneNo,
//      parentPhoneNo,
//      batch})
//      await user.save();
//      res.json(user);
// }

//  exports.userSignIn = async (req,res) => {
//         const {email,password} = req.body
//         const user =await User.findOne({email})
//         if(!user) return res.json({success: false,message: 'user not found,with the given email'})
       
//         const isMatch = await user.comparePassword(password)
//            if(isMatch) return res.json({success : false, message: 'email/password does not match!'});
   
//           const  token = jwt.sign({userId:user._id},VERYsecret123,{expiresIn:'1d'});
   
//            res.json({success: true,user,token});
   
//    };


// exports.createUsers = async(req,res)=>{
//    console.log(req.body);
//    const data = await User.create(req.body);
//    res.json({msg:'data received',users:data})
// }









































































// const jwt =require('jsonwebtoken');
// const User=require('../models/user.js');
// exports.createUser=async(req,res) => {
// const {email,password,confirmPassword,studentPhoneNo,parentPhoneNo,batch}=req.json(req.body);
//    const isNewUser=isThisEmailInUse(email);
// if(!isNewUser)
//  return res.json({
// success:false,
// message:'this email is already in use,try sign-in',
// });
//            const user = await User({email ,password, confirmPassword,studentPhoneNo,parentPhoneNo,batch})
//             await user.save();
//             res.json(user);   
//     };

// exports.userSignIn = async (req,res) => {
//      const {email,password} = req.body
//      const user =await User.findOne({email})
//      if(!user) return res.json({success: false,message: 'user not found,with the given email'})
    
//      const isMatch = await user.comparePassword(password)
//         if(isMatch) return res.json({success : false, message: 'email/password does not match!'});

//        const  token = jwt.sign({userId:user._id},VERYsecret123,{expiresIn:'1d'});

//         res.json({success: true,user,token});

// };