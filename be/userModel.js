const mongoose = require('mongoose')

const userSignUpSchema=new mongoose.Schema(
    {
        mailId: String,
        password: String,
        confirmPassword: String,
        stdPhNo: String,
        parentPhNo: String,
        batch: String
    }
);
module.exports=mongoose.model("userSignUp",userSignUpSchema)