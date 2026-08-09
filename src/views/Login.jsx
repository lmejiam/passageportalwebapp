import React from "react";
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import Dashboard from "./Dashboard";

const Login = ()=>{
    
    return(
        <>
        <div className='flex justify-center items-center bg-darkgray p-20 pb-30' >
            <div className="bg-lightgray border-3 border-black rounded-lg w-150 h-200">
                <div className= "flex justify-center mt-20 ml-10 mr-10 bg-white p-5 border-2 border-darkgray rounded-lg">
                    <img className="w-100 " src="../WhooshhLogo.png" alt="Whooshh Logo"/>
                </div>
                <div className="flex justify-center m-10 mb-5">
                    <h1 className= "text-black text-2xl font-mono">PASSAGE PORTAL ACCESS</h1>
                </div>
                <div className="flex justify-center mt-8">
                    <h1 className= "text-black text-l font-mono ">Please Enter your details: </h1>
                </div>
                <div className="flex justify-center m-10">
                    <input className="bg-white h-10 w-100 font-mono border-darkgray rounded-lg border-2 pl-5" type="text" placeholder='Email address' name='email' s></input>
                </div>

                <div className="flex justify-center m-10">
                    <input className="bg-white h-10 w-100 font-mono border-darkgray rounded-lg border-2 pl-5" type="password" placeholder='Password' name='password' s></input>
                </div>
                
                <div className="flex justify-center mt-15">
                    <div className="flex justify-center items-center w-35 h-20 bg-whooshhgreen border-darkgray border-2 rounded-lg font-mono font-bold">
                        <Link  to={'/dashboard'} >Login</Link>
                    </div>
                </div>
                

            </div>
            
        </div>
        </>
    )
}
export default Login;