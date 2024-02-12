'use client'

import React, { useEffect } from "react"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";


export default function SignupPage(){
    const router=useRouter();
    const [user, setUser]=React.useState({
        email:"",
        password:"",
        username:""
    });

    const [disabledButton, setDisabledButton]=React.useState(false);
    const [loading, setLoading]=React.useState(false);

    useEffect(()=>{
        if(user.email.length>0 && user.username.length>0 && user.password.length>0){
            setDisabledButton(false);
        }
        else{
            setDisabledButton(true);
        }
    },[user]);

    const onSignup=async()=>{
        try{
            console.log("hiii")
            setLoading(true);
            const response= await axios.post("/api/users/signup", user);

            console.log("Signup success", response.data);

            router.push("/login");

        }
        catch(error:any){
            console.log(error.message);
        }
        finally{
            setLoading(false);
        }
    }
    return(
        <div className="flex flex-col bg-red-600 items-center justify-center min-h-screen py-2 gap-2">
        <h1 className="text-2xl font-bold">{loading?"loading...":"Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className="p-2 rounded-lg" type="text" placeholder="username" id="username"
        value={user.username}
        onChange={(e)=>{setUser({...user, username:e.target.value})}} 
        />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 rounded-lg" type="text" placeholder="email" id="email"
        value={user.email}
        onChange={(e)=>{setUser({...user, email:e.target.value})}} 
        />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 rounded-lg" type="password" placeholder="password" id="password"
        value={user.password}
        onChange={(e)=>{setUser({...user, password:e.target.value})}} 
        />
        <button onClick={onSignup} className="bg-slate-600 p-2 rounded-lg">{disabledButton? "No Signup":"Signup here"}</button>
        <Link href="/login">visit to login page</Link>
        </div>
    )
}