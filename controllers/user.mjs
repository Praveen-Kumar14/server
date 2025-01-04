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
  return res.json({error:'internal server error'});
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
    res.json({ success: true, user, token ,message:'Login successfully',parentMobileNo:user.parentMobileNo,Roll_No:user.Roll_No});
    console.log(user.parentMobileNo," ",user.Roll_No);
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
    const user = await User.findOne({ email }).select('+password');
    if(!user){
      res.json({error:'Mail Id is not Exists'});
    }

    const isMatch = await user.comparePassword(password);

    if(isMatch){
      res.json({error:'password is already in use '});
    }
    if(user.Roll_No===Roll_No){
      user.password=password;
      user.confirmPassword=confirmPassword;
      console.log(password," ",user.password,Roll_No," ",user.Roll_No);
      await user.save();
    return res.json({ message: 'Password updated successfully', password });
    }
    else{
      return res.json({error:'Roll No does not match'});
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default {
  createUser,
  userSignIn,
};
