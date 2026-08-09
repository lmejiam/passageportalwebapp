import React from "react";
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";

const Dashboard = ()=>{
    
    return(
        <>
        <div className='flex justify-center items-center bg-darkgray p-20 pb-30' >
            <div className="bg-lightgray border-3 border-black rounded-lg w-150 h-200">
                <div className= "flex justify-center mt-20 ml-10 mr-10 bg-white p-5 border-2 border-darkgray rounded-lg">
                    <img className="w-100 " src="../WhooshhLogo.png" alt="Whooshh Logo"/>
                </div>
                <div className="flex justify-center m-10 mb-5">
                    <h1 className= "text-black text-2xl font-mono">DASHBOARD</h1>
                </div>
                

            </div>
            
        </div>
        </>
    )
}
export default Dashboard;