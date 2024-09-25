// validation/user.mjs
import { check, validationResult } from 'express-validator';

export const validateUserSignUp = [
  check('email').trim().isEmail().not().withMessage('Invalid email!'),
  check('password').trim().not().isEmpty().withMessage('Must contain a password').isLength({ max: 15, min: 3 }).withMessage('Password must be between 3 to 15 characters!'),
  check('confirmPassword').trim().not().isEmpty().custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Both passwords must be the same');
    }
    return true;
  }),
   check('Roll_No').trim().matches(/^\d{3}[A-Z]{3}\d{3}$/).withMessage('RollNo in format 123ABC012'),
  check('studentPhoneNo').notEmpty().isLength({min:8, max:11}).withMessage('Invalid student number'),
   check('parentMobileNo').notEmpty().isLength({min:8, max:11}).withMessage('Invalid parent number'), 
   check('batch').notEmpty().matches(/^[0-9]{4}-[0-9]{4}$/).withMessage('BatchNo in format : 2017-2021')
];

export const uservalidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ success: false, error: error });
};

export const validateUserSignIn = [
  check('email').trim().isEmail().withMessage('Email/password is required!'),
  check('password').trim().not().isEmpty().isLength({min:3 ,max:10}).withMessage('Email/password is required!'),
];

export const ValidateChangePassword= [
  check('Roll No').trim().matches(/^\d{3}[A-Z]{3}\d{3}$/).withMessage('RollNo in format 123ABC012'),
  check('User Id').trim().isEmail().not().withMessage('Invalid email!'),
  check('password').trim().not().isEmpty().withMessage('Must contain a password').isLength({ max: 15, min: 3 }).withMessage('Password must be between 3 to 15 characters!'),
  check('confirmPassword').trim().not().isEmpty().custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Both passwords must be the same');
    }
    return true;
  }),
]

export default {
  validateUserSignUp,
  uservalidation,
  validateUserSignIn,
  ValidateChangePassword
};
























// const{check,validationResult}=require('express-validator')


// exports.validateUserSignUp= [
// check('email').normalizeEmail().isEmail().withMessage('invalid email!'),
// check('password').trim().not().isEmpty().withMessage('must contain password').isLength({max:15 , min:3}).withMessage('password must be within 3 to 10 character!'),
// check('confirmPassword').trim().not().isEmpty().custom((value,{req})=>{
//    if(value !== req.body.password){
//         throw new Error('both password must be same')
// }
// return true;
// }),
// // check('studentPhoneNo').trim().isEmpty().withMessage('invalid student number'),
// // check('parentPhoneNo').trim().isEmpty().withMessage('invalid parent number'), 
// check('batch').trim().isEmpty().withMessage('eg:2017-2021')
// ];

// exports.uservalidation=(req,res,next)=>{
//    const result=validationResult(req).array();
//    if(!result.length) return next();

//    const error=result[0].msg;
//    res.json({success:false, message:error});
// }
// exports.validateUserSignIn = [
//         check('email').trim().isEmail().withMessage('email/password is required!'),
   
//         check('password').trim().not().isEmpty().withMessage('email/password is required!')
   
//    ];

















































































// const {check,validationResult}=require('express-validator')

// exports .validateUserSignUp=[
// // check('firstname').trim().isEmpty().withMessage('name is required!').isString().withMessage('must be a valid name!').isLength({min:3,max:20}).
// // withMessage('name must be within 3 to 10 character!'),
// check('email').normalizeEmail().isEmail().withMessage('invalid email'),
// check('password').trim().isEmpty().withMessage('password is empty!').isLength({min:3,max:20}).
// withMessage('name must be within 3 to 10 character!'),
// check('confirmPassword').trim().isEmpty().custom((value,{req})=>{
//    if(value!==req.body.password){
// throw new Error('both password must be same')
// }
// return true;
// }),
// check('studentPhoneNo').trim().isEmpty().withMessage('Enter your mobile number'),
// check('parentPhoneNo').trim().isEmpty().withMessage('Enter parent Mobile number'),
// check('batch').trim().isEmpty().withMessage('eg:2017-2021')
// ];

// exports.userValidation=(req,res,next)=>{
// const result=validationResult(req).array()
// if(!result.length) 
// return next();
 
// const error =result[0].msg;
// res.json({success:false,message:error})
// };

// exports.validateUserSignIn = [
//      check('email').trim().isEmail().withMessage('email/password is required!'),

//      check('password').trim().not().isEmpty().withMessage('email/password is required!')

// ];