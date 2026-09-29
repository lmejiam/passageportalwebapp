import React from "react";
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Dropzone from "../components/Dropzone";
import Summary from "../components/Summary";
import Status from "../components/Status";
import SortSettings from "../components/Sortsettings";

const Dashboard = ()=>{

    const FETCH_INTERVAL_MS = 3000;
    
    const [fish, setFish] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState({  site : "Hemne",
                                            computervision : "RUNNING",
                                            sorting : "RUNNING"
                                        });
    
    const [lanes, setLanes] = useState([
                                                        { name: "LANE 0", destination: "BYPAS",   count: 1 },
                                                        { name: "LANE 1", destination: "CULL",     count: 1 },
                                                        { name: "LANE 2", destination: "NETPEN A", count: 1 },
                                                        { name: "LANE 3", destination: "NETPEN B", count: 1 },
                                                        { name: "LANE 4", destination: "NETPEN C", count: 1 },
    ]);

    useEffect(() => {

        const fetchStatus = ()=> {
                fetch('https://fishlrecognition.com/api/user/status')
            .then(res => {
                if (!res.ok) throw new Error('Request failed');
                return res.json();
            })
            .then(data => {
                setStatus(data)
                setLanes(prev => [
                            { ...prev[0], destination: data.l0_tag},
                            { ...prev[1], destination: data.l1_tag},
                            { ...prev[2], destination: data.l2_tag},
                            { ...prev[3], destination: data.l3_tag},
                            { ...prev[4], destination: data.l4_tag},
]);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
        }

        fetchStatus();

        const intervalID = setInterval(fetchStatus, FETCH_INTERVAL_MS);

        return () => clearInterval(intervalID);

        
    }, []);
    
    return(
        <div className="w-full min-w-page h-screen">
            <div className="pl-12 pr-12">
                <Header></Header>
            </div>    
        
            <div className="flex pl-12 pr-12 mt-5">
                <div className="w-2/5">
                    <Status site={status.site} computerVisionStatus={status.computervision} sortingStatus={status.sorting } ></Status>
                    <Summary lanes={lanes}></Summary>
                </div>

                <div className="w-3/5">
                    <SortSettings></SortSettings>
                    <h2 className="text-xl text-center">Priority Tag File</h2>
                    <div className="flex justify-center">            
                        <Dropzone></Dropzone>                
                    </div>                        
                                
                </div> 
        
            </div>                    

                
        </div>
    )
}
export default Dashboard;