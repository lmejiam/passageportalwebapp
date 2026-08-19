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
        <>
        <Header></Header>
        
        <div className='flex justify-center items-center bg-darkgray p-20 pb-30' >
            <div className="bg-lightgray border-3 border-black rounded-lg  h-200 min-w-450">
                <div className="flex justify-between p-10">
                    <div className="w-300  text-center">
                        <h1 className= "text-black text-2xl font-mono">DASHBOARD</h1>

                        <table>
                            <thead className="text-xl font-bold font-mono border-2 border-whooshhgreen">
                                <th>TAG NUMBER</th>
                                <th>PRIORITY</th>
                                <th>CIRCUMFERENCE</th>
                                <th>WEIGHT</th>
                                <th>GATE</th>
                                <th>OUTPUTLANE</th>
                                <th>SORT INFO</th>
                                <th>TIMESTAMP</th>
                            </thead>
                            <tbody>
                                {fish.map(f =>(
                                    <tr key={f.whooshh_id}>
                                        <td>{f.tag_num}</td>
                                        <td>{f.priority}</td>
                                        <td>{f.circumference}</td>
                                        <td>{f.weight}</td>
                                        <td>{f.gate}</td>
                                        <td>{f.outputlane}</td>
                                        <td>{f.outputlanereason}</td>
                                        <td>{f.timestamp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div>
                    <div>
                        <h2 className="text-2xl text-center">Priority Tag File</h2>
                        <Dropzone></Dropzone>
                    </div>
                </div>

                
                

            </div>
            
        </div>
        </>
    )
}
export default Dashboard;