import React from "react";
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";

const Dashboard = ()=>{
    
    const [fish, setFish] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://whooshh-controls.flashhub.net/api/user/fish')
        .then(res => {
            if (!res.ok) throw new Error('Request failed');
            return res.json();
        })
        .then(data => setFish(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, []);
    
    
    
    
    
    
    
    
    
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
                <div className="flex justify-center">
                    <h2>Fish</h2>
                    <ul>
                        {fish.map(f =>(
                            <li key={f.whooshh_id}>
                                id-{f.file_id_aris} circum-{f.circumference} weight-{f.weight} lane-{f.gate} outputreason-{f.outputreason}
                            </li>
                        ))}
                    </ul>
                </div>
                

            </div>
            
        </div>
        </>
    )
}
export default Dashboard;