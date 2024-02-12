'use client'

import React from "react"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import { useEffect } from "react";


export default function LoginPage(){
    const [user, setUser]=React.useState({
        password:"",
        username:""
    });
    const router=useRouter();
    const [disabledButton, setDisabledButton]=React.useState(false);
    const [loading, setLoading]=React.useState(false);

    useEffect(()=>{
        if(user.username.length>0 && user.password.length>0){
            setDisabledButton(false);
        }
        else{
            setDisabledButton(true);
        }
    },[user]);

    const onLogin=async()=>{
        try{
            console.log("hiii")
            setLoading(true);
            const response= await axios.post("/api/users/login", user);

            console.log("login success", response.data);

            router.push("/profile");

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
        <h1 className="text-2xl font-bold">{loading?"proccessing...":"login"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className="p-2 rounded-lg" type="text" placeholder="username" id="username"
        value={user.username}
        onChange={(e)=>{setUser({...user, username:e.target.value})}} 
        />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 rounded-lg" type="password" placeholder="password" id="password"
        value={user.password}
        onChange={(e)=>{setUser({...user, password:e.target.value})}} 
        />
        {disabledButton?<button onClick={onLogin} className="bg-green-600 p-2 rounded-lg" disabled>No Login</button>:<button onClick={onLogin} className="bg-slate-600 p-2 rounded-lg">Login here</button>}
        <Link href="/signup">visit to Signup page</Link>
        </div>
    )
}