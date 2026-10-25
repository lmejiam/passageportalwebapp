import React from "react";
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'


const Dropzone = () => {

    const [files, setFiles] = useState([]) 

    const [progress, setProgress] = useState(0)
    const [uploadState, setUploadState] = useState("idle")

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length){
            setFiles(previousFiles =>[
                ...previousFiles,
                ...acceptedFiles
            ])
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
            onDrop,
            maxFiles: 1,
            multiple: false,
            accept: {
                        "text/plain": [".txt",".csv"],
                        "application/octet-stream": [".csv"],
                        "text/csv": [".csv"],
                        "application/vnd.ms-excel": [".csv"]
            }
        })

    const removeFile = (fileName) => {
        setFiles(previousFiles => {
            const target = previousFiles.find(f => f.name === fileName);
            if (target?.preview) URL.revokeObjectURL(target.preview);
            return previousFiles.filter(file => file.name !== fileName);
        });
    };

    const handleSubmit = async () => {
    if (!files || files.length === 0) {
        console.log("No files selected");
        return;
    }

    const formData = new FormData();
    files.forEach(file => {
        formData.append("files", file);
    });

    try {
        const response = await
        axios.post("https://fishlrognition.com/api/tags/upload", formData, {
            onUploadProgress: (event) => {
                if (event.total){
                    setProgress(Math.round((event.loaded * 100)/ event.total))
                }
            },
        });
        console.log("Upload successful:", response.data);

        setUploadState("done");
        setFiles([]);
    } catch (err) {
        console.error("Upload error:", err.response?.data?.message || err.message);
        setUploadState("error");
    } finally {
        setTimeout(()=>{
            setUploadState("idle");
            setProgress(0);
        }, 3000)
    }
};

return (
    <div className="flex items-center justify-around rounded-xl bg-neutral-950  w-full h-50">
        <div className="h-30 w-50 border-2 border-whooshhgreen bg-white rounded-3xl">
            <div className="size-full flex justify-center text-center items-center" {...getRootProps()}>
                <input className="items-center" {...getInputProps()} />
                {isDragActive ? (
                    <p className="font-mono text-sm" > Drop files here</p>
                ) : (
                    <p className="font-mono text-sm">Drag and drop file here, or click to select File</p>
                )}  
            </div>
        </div>
        <div className="w-1/3 border-2">
            <ul className="text-center">
                {files.map(file => (
                    <li key={file.name} className="flex justify-center w-30 text-white">
                        {file.name}
                        <button
                        className="ml-5 text-red-600"
                        type="button"
                        onClick={() => removeFile(file.name)}
                        
                    >
                        X
                </button>
                    </li>
                ))}
                <li><button className="h-15 w-full bg-whooshhgreen p-5 border-2 border-black rounded-2xl justify-center flex items-center mt-10" type="button" onClick={handleSubmit}>Submit File</button></li>
                {uploadState !== "idle" && (
                    <li className="mt-3">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-700">
                            <div
                                className={`h-full transition-all duration-200 ${uploadState === "error" ? "bg-red-600" : "bg-whooshhgreen"}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="mt-1 text-sm text-white">
                            {uploadState === "uploading" && `Uploading… ${progress}%`}
                            {uploadState === "done" && "Upload complete"}
                            {uploadState === "error" && "Upload failed"}
                        </p>
                    </li>
                )}
            
            </ul>
        </div>

    </div>
    )
}
export default Dropzone;