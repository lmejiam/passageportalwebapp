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
    const [total, setTotal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState({  site : "Hemne",
                                            computervision : "RUNNING",
                                            sorting : "RUNNING"
                                        });
            
    
    const [lanes, setLanes] = useState([
                                                        { name: "LANE 0", destination: "BYPAS",    sortoutput: '0', count: 1 },
                                                        { name: "LANE 1", destination: "CULL",     sortoutput: '1', count: 1 },
                                                        { name: "LANE 2", destination: "NETPEN A", sortoutput: '2', count: 1 },
                                                        { name: "LANE 3", destination: "NETPEN B", sortoutput: '3', count: 1 },
                                                        { name: "LANE 4", destination: "NETPEN C", sortoutput: '4', count: 1 },
    ]);

    useEffect(() => {
        const fetchJson = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Request failed: ${url}`);
        return res.json();
        };

        const fetchData = async () => {
        try {
                const [statusData, countsData] = await Promise.all([
                fetchJson('https://fishlrecognition.com/api/user/status'),
                fetchJson('https://fishlrecognition.com/api/user/counts'),
        ]);

        setStatus(statusData);
        setLanes(prev => [
            { ...prev[0], destination: statusData.l0_tag, count: countsData.lane0 },
            { ...prev[1], destination: statusData.l1_tag, count: countsData.lane1 },
            { ...prev[2], destination: statusData.l2_tag, count: countsData.lane2 },
            { ...prev[3], destination: statusData.l3_tag, count: countsData.lane3 },
            { ...prev[4], destination: statusData.l4_tag, count: countsData.lane4 },
        ]);
        setTotal(countsData.total)
        setError(null);
            } catch (err) {
        setError(err.message);
            } finally {
        setLoading(false);
            }
    };

    fetchData();
    const intervalID = setInterval(fetchData, FETCH_INTERVAL_MS);
    return () => clearInterval(intervalID);
}, []);
    
    return(
        <div className="w-full min-w-page h-screen">
            <div className="pl-12 pr-12">
                <Header></Header>
            </div>    
        
            <div className="flex pl-12 pr-12 mt-5 justify-center">
                <div className="w-2/5">
                    <Status site={status.site} computerVisionStatus={status.computervision} sortingStatus={status.sorting } ></Status>
                    <Summary lanes={lanes}></Summary>
                </div>

                <div className="w-3/5">
                    <SortSettings lanes={lanes}></SortSettings>
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