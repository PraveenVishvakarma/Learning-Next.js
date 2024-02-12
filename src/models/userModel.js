import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide the username'],
        unique:true,
    },
    email:{
        type: String,
        required: [true,'Please provide the email'],
        unique: true,
    },
    password:{
        type:String,
        required:[true,'Please provide the password'],
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    isVerify:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    verifyToken: String,
    verifyTokenExpire: Date,
});

const User=mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;