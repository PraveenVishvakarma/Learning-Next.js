 "use client"
 import axios from "axios"
 import React, { useState } from "react"
 import { useRouter } from "next/navigation"
import Link from "next/link";

 

 export default function Profile(){
    const [data, setData]=useState("nothing");
    const router=useRouter();

    const handleLogout=async()=>{
        try{
            const response=await axios("/api/users/logout");
            console.log("logout successful", response.data);
            router.push("/login");
        }
        catch(error:any){
            console.log(error.message);
        }
    }

    const getData=async ()=>{
        try{
            const response=await axios("/api/users/me");
            console.log("data success",response.data);
            setData(response.data.data._id);
        }
        catch(error){
            console.log(error);
        }
      
    }
    
    
    return(
        <div className="flex flex-col bg-red-600 items-center justify-center min-h-screen py-2 gap-2">
            <h1 className="text-4xl font-bold ">Profile</h1>
            <hr />
            <p className="text-2xl">Profilepage</p>
            {data === "nothing"? "Nothing": <Link href={`/profile/${data}`}>{data}</Link> }
            <button onClick={handleLogout} className="bg-blue-500 my-3 p-2 rounded-lg hover:opacity-40">Logout</button>
            <button onClick={getData} className="bg-purple-500 my-3 p-2 rounded-lg hover:opacity-40">getUSerData</button>
        </div>
    )
}