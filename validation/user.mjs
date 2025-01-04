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
