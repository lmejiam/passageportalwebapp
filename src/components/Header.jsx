import React from "react";
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";

const Header = ()=>{

    
    return(
        <div className="bg-darkgray pl-12 pr-12">
        <div className='flex justify-around items-center border-3 border-black bg-lightgray min-w-450 rounded-l' >
                <div className= "flex justify-center m-5 bg-white p-5 border-2 border-darkgray rounded-lg w-50">
                    <img className="w-100 " src="../WhooshhLogo.png" alt="Whooshh Logo"/>
                </div>
                <div className="w-200" >
                    <ul className="flex justify-around font-mono text-xl">
                        <li>Upload Files</li>
                        <li>Change Settings</li>
                    </ul>
                </div>
        </div>
        </div>
    )
}
export default Header;