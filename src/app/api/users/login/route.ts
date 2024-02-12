import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request:NextRequest){
    try{
        const reqBody= await request.json();
        const {username, password}=reqBody;


        const user=await User.findOne({username});

        if(!user){
            return NextResponse.json({error:"User does not exist",status:400});
        }

        //hashed password
        const validPassword=await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({message:"invalid Password", status:500});
        }


        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email,
        }

        const token=await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"1h"});

        const response=NextResponse.json({
            message:"Login successfully",
            success:true,
        });

        response.cookies.set("token", token, {httpOnly:true});

        return response;

    }
    catch(error:any){
        console.log(error);
        return NextResponse.json({error:error.message,status:500});
    }
}