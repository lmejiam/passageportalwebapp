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
    const [status, setStatus] = useState({  site_name : "NORWAY",
                                            computervision : "STOPPED",
                                            sorting : "STOPPED",
                                            activetagfile: "NULL"
                                        });
            
    
    const [lanes, setLanes] = useState([
                                                        { name: "LANE 0", destination: "BYPASS",    sortoutput: '0', count: 1 },
                                                        { name: "LANE 1", destination: "CULL",     sortoutput: '1', count: 1 },
                                                        { name: "LANE 2", destination: "NETPEN A", sortoutput: '2', count: 1 },
                                                        { name: "LANE 3", destination: "NETPEN B", sortoutput: '3', count: 1 },
                                                        { name: "LANE 4", destination: "NETPEN C", sortoutput: '4', count: 1 },
    ]);

    const [remoteConnectionStatus, setRemoteConnectionStatus] = useState("NOT FOUND");

    useEffect(() => {
        const fetchJson = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Request failed: ${url}`);
        return res.json();
        };

        const fetchData = async () => {
        try {
                const [statusData, countsData, pingData] = await Promise.all([
                fetchJson('https://fishlrecognition.com/api/user/status'),
                fetchJson('https://fishlrecognition.com/api/user/counts'),
                fetchJson("https://fishlrecognition.com/api/user/ping"),
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
        setRemoteConnectionStatus(pingData.remoteConnectionStatus)
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
            <div className="w-full flex justify-around mx-12 px-12">
                <div className="flex min-w-350 mt-5">
                    <div className="w-150 min-w-150">
                        <Status 
                            site={status.site_name}
                            computerVisionStatus={status.computervision} 
                            sortingStatus={status.sorting} 
                            activeTagFile={status.activetagfile}
                            remoteConnectionStatus={remoteConnectionStatus} >
                        </Status>
                        <Summary 
                            lanes={lanes} 
                            dayCount={total}>
                        </Summary>
                    </div>

                    <div className="w-150 min-w-150">
                        <SortSettings lanes={lanes}></SortSettings>
                        <h2 className="mb-2.5 ml-8 text-xl font-semibold tracking-wide text-white">UPLOAD TAG FILE</h2>
                        {
                            remoteConnectionStatus !== "NOT FOUND" ?  (
                                <div className="flex justify-center px-5 pb-6">            
                                    <Dropzone></Dropzone>                
                                </div>                        
                            ) : (
                                <div className="flex justify-center px-5 pb-6">
                                    <div className="flex items-center justify-center rounded-xl bg-black w-full h-20">
                                        <p className="text-white text-2xl">Remote System Not Found. Cannot Upload Tags</p>
                                    </div>
                                    
                                </div>
                                
                            )
                        }
                    </div>
            
                </div> 
            </div> 
                
        </div>
    )
}
export default Dashboard;