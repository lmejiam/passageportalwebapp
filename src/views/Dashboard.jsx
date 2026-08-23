import React from "react";
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Dropzone from "../components/Dropzone";


const Dashboard = ()=>{

    const FETCH_FISH_INTERVAL_MS = 5000;
    
    const [fish, setFish] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchFish = ()=> {
                fetch('http://fishlrecognition.com/api/user/fish')
            .then(res => {
                if (!res.ok) throw new Error('Request failed');
                return res.json();
            })
            .then(data => setFish(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
        }

        fetchFish();

        const intervalID = setInterval(fetchFish, FETCH_FISH_INTERVAL_MS);

        return () => clearInterval(intervalID);

        
    }, []);
    
    return(
        <div className="bg-darkgray w-full">
        <div className="pl-12 pr-12">
            <Header></Header>
        </div>    
        
        
        <div className='flex justify-center items-center bg-darkgray p-12 w-full' >
            <div className="bg-lightgray border-3 border-black rounded-lg p-5 w-full">
                <div className="flex justify-between">
                    <div className="w-300  text-center">
                        <h1 className= "text-black text-2xl font-mono">DASHBOARD</h1>

                        <table>
                            <thead className="flex justify-between w-fit items-center text-m font-bold font-mono border-2 border-whooshhgreen">
                                <th className="w-40 p-2 border-2 border-black">TAG NUMBER</th>
                                <th className="w-40 p-2 border-2 border-black">PRIORITY</th>
                                <th className="w-40 p-2 border-2 border-black">CIRCUM</th>
                                <th className="w-40 p-2 border-2 border-black">WEIGHT</th>
                                <th className="w-40 p-2 border-2 border-black">GATE</th>
                                <th className="w-40 p-2 border-2 border-black">OUTPUTLANE</th>
                                <th className="w-40 p-2 border-2 border-black">SORT INFO</th>
                                <th className="w-40 p-2 border-2 border-black">TIMESTAMP</th>
                            </thead>
                            <tbody>
                                {fish.map(f =>(
                                    <tr key={f.whooshh_id} className="flex justify-between items-center text-xs">
                                        <td className="w-40 p-2 border-2 border-black">{f.tag_num}</td>
                                        <td className="w-40 p-2 border-2 border-black">{f.priority}</td>
                                        <td className="w-40 p-2 border-2 border-black">{f.circumference}</td>
                                        <td className="w-40 p-2 border-2 border-black">{f.weight}</td>
                                        <td className="w-40 p-2 border-2 border-black">{f.gate}</td>
                                        <td className="w-40 p-2 border-2 border-black">{f.outputlane}</td>
                                        <td className="w-40 p-2 border-2 border-black">{f.outputlanereason}</td>
                                        <td className="w-40 p-2 border-2 border-black">{f.timestamp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div>
                    <div>
                        <h2 className="text-xl text-center">Priority Tag File</h2>
                        <Dropzone></Dropzone>
                    </div>
                </div>

                
                

            </div>
            
        </div>
        </div>
    )
}
export default Dashboard;