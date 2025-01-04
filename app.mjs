import express from 'express';
import User from './models/user.mjs'; // Assuming 'user.js' is your User model file
import userRouter from './routes/user.mjs';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(cors());

const test = async (email,password) => {
      const user = await User.findOne({email:email});
      const result = await user.comparePassword(password)
      console.log(result);
     }


try{
  await mongoose.connect("mongodb+srv://Scanner:PassCode789@cluster0.mdfxgng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(1980,()=>{
    console.log('server is listening');
   });
}
catch(error){
  console.log(error);
  process.exit(1);
}


