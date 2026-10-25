import React from "react";
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate, Link, NavLink } from "react-router-dom";

const Header = ()=>{

    const linkClass = ({ isActive }) =>
        "rounded-lg px-4 py-2 text-xl font-semibold tracking-wide " +
        (isActive ? "bg-whooshhgreen text-black" : "text-white hover:text-whooshhgreen");

    return(

        <div className='flex items-center  bg-darkgray w-full rounded-lg' >
                <div className= "flex ml-12 mt-5 bg-white p-5 border-2 border-white rounded-lg w-50">
                    <img className="w-100 " src="../WhooshhLogo.png" alt="Whooshh Logo"/>
                </div>
                <nav className="ml-12 mt-5 flex gap-4">
                    <NavLink to="/dashboard" className={linkClass}>DASHBOARD</NavLink>
                    <NavLink to="/images" className={linkClass}>IMAGES</NavLink>
                </nav>

        </div>
    )
}
export default Header;