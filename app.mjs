// app.mjs
import express from 'express';
import './models/db.mjs'; // Assuming 'db.js' is your database connection file
import User from './models/user.mjs'; // Assuming 'user.js' is your User model file
import userRouter from './routes/user.mjs';
import cors from 'cors';
// import mysql from 'mysql2';
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



















































// const express=require('express');

// require('./models/db');
// // import userRouter from './routes/user.js'
// const User=require('./models/user')
// const userRouter=require('./routes/user')
// const app=express();
// app.use(express.json());
// app.use(userRouter);

// app.get('/',(req,res)=>{
//      res.send('Hello world')
// })

// app.listen(8000,()=>{
//    console.log('port is listening');
// });

// app.get('/test',(req,res)=>{
//   res.send('hello world');
// })
// app.use('/api/v1',userRouter)

























































































// // const express =  require('express');
// // require('./models/db');
// // const userRouter=require('./routes/user');
// //      const User =require('./models/user')
// //     const app = express();
// //     //            <!--app.use((res,req,next)=>{
// //     //      req.on('data',(chunk)=>{
// //     //  const data=json.parse(chunk);
// //     //    req.body=data;
// //     //          next();
// //     //             });

// //     //               });--!>
// // app.use(express.json());
// // app.use(userRouter);

// // const test = async (email,password) => {
// //    const user = await User.findOne({email:email});
// //    const result = await user.comparePassword(password)
// //    console.log(result);

// // }

// // test('niraj@email.com','niraj123');

// // app.get('./test',(req,res)=>{
// // res.send('hello world')
// // })


// //    app.get('/',(req,res) => {
// //          res.send('<h1 style="color:red;">Hello World</h1>');
// //   });

// //    app.listen(8000,() => {
// //        console.log('Port is listening');
// //   });


// //   //mongodb+srv://fsUser:<password>@fstodo.etgdd.mongodb.net/myfirstDatabase?retryWrites=true&w=majority