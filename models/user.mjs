// models/user.mjs
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  Roll_No:{
    type: String,
    required:true,
  },
  studentPhoneNo: {
    type: String,
    required: true,
  },
  parentMobileNo: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const hash = await bcrypt.hash(this.password, 8);
      this.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is missing, cannot compare!');

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error while comparing password!', error.message);
    throw error;
  }
};

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error('Invalid email');
  try {
    const user = await this.findOne({ email: email });
    return !user;
  } catch (error) {
    console.log('Error inside isThisEmailInUse method', error.message);
    return false;
  }
};

export default mongoose.model('User', userSchema);






// const mongoose=require('mongoose');
// const bcrypt=require('bcrypt');

// // const user={
// //       email:' ',
// //       password:' ',
// //       confirmPassword:' ',
// //       studentPhoneNo:' ', 
// //       parentPhoneNo:' ',
// //       batch:' ',
// // }


// const userSchema=new mongoose.Schema({
//       email:{
//             type: String,
//             required:true,
//             unique:true,
//       },
//       password:{
//             type: String,
//             required:true,
//       },
//       confirmPassword:{
//             type: String,
//             required:true,
//       },
//       studentPhoneNo:{
//             type: String,
//             required:true,
//       },
//       parentPhoneNo:{
//             type:String,
//             required:true,
//       },
//       batch:{
//             type:String,
//             required:true,
//       }

// });

// module.exports=mongoose.model('User',userSchema);
// userSchema.pre('save',function(next) {
//                   if(this.isModified('password')) {
//                   bcrypt.hash(this.password,8,(err,hash) => {
//                      if(err) return next(err);
       
//                      this.password =hash;
//                      next();
//                     })
//                 }
//            })
         
// userSchema.methods.comparePassword = async function(password) {
// if(!password) throw new error ('password is missing,can not compare!');
   
// try  {
// const result = await bcrypt.compare(password,this.password)
// return result;
// }catch(error) {
// console.log('Error while comparing password!', error.message)
//        }
// }
// // // const user = User.findOne({email});
// // // user.comparePassword()

// userSchema.statics.isThisEmailInUse=async function(email){
//        if(!email) throw new error('invalid email');
//        try{
//        const user=await this.findOne({email:email})
//     if(user) return false;
//     return true;
// }
// catch(error){
//        console.log('error inside isThisEmailInUse method', error.message)
//        return false;
// }
// };


































































// // const mongoose = require('mongoose');

// //     module.exports = mongoose
// //           .connect("mongodb+srv://admin:admin123@cluster0.yqr7kct.mongodb.net/mydatabase?retryWrites=true&w=majority",{
// //                 useNewUrlParser:true,
// //                 useUnifiedTopology:true,
// //      }).then(() => {
// //              console.log('our db is connected');
// //      })              
// //        .catch(err =>console.log(err.message));













// // const mongoose =require('mongoose');
// //    const bcrypt = require('bcrypt');
  
// //    const User = {
// //               email:' ',
// //               password:' ', 
// //               confirmPassword:' ',
// //               studentPhoneNo:' ',
// //               parentPhoneNo:' ',
// //               batch:' '
// //     }
 

// //   const userSchema= new mongoose.Schema({
// //                email:{
// //                       type:String,
// //                       required:true,
// //                       unique :true,
// //         },
// //                password:{
// //                       type:String,
// //                        required:true,
// //         },
// //               confirmPassword:{
// //                      type:String,
// //                      required:true,
// //               },
// //               studentPhoneNo:{
// //                      type:String,
// //                      required:true,
// //               },
// //               parentPhoneNo:{
// //                      type:String,
// //                      required:true,
// //               },
// //               batch:{
// //                      type:String,
// //                      required:true,
// //               }
// //     }) ;
    
// //        userSchema.pre('save',function(next) {
// //            if(this.isModified('password')) {
// //            bcrypt.hash(this.password,8,(err,hash) => {
// //               if(err) return next(err);

// //               this.password =hash;
// //               next();
// //              })
// //          }
// //       })
         
// //        const user = User.findOne({email});
// //         user.comparePassword()
// //        userSchema.methods.comparePassword = async function(password) {
// //            if(!password) throw new error ('password is missing,can not compare!');
   
// //            try  {
// //                const result = await bcrypt.compare(password,this.password)
// //                 return result;
// //             }catch(error) {
// //               console.log('Error while comparing password!', error.message)
// //        }
// // }
    
// //        userSchema.statics.isThisEmailInUse = async function(email){
// // if(!email) throw new Error('Invalid email');
// //               try{
// //                       const user = await this.findone({email})
// //                       if (user) return false;
// //                        else
// //                       return true;
// //               }catch(error){
// //                console.log('error inside isThisEmailInUse method', error.message)
// //                 return false;
// //          };
// //      }

     
// //      module.exports=mongoose.model(User);
// //        module.exports = mongoose.model('user', userSchema);