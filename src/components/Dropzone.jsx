import React from "react";
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone = () => {

    const [files, setFiles] = useState([]) 

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
                        "text/plain": [".txt", ".ini", ".config",".csv"],
                        "application/octet-stream": [".ini", ".config",".csv"],
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
        const response = await fetch("http://fishlrecognition.com/api/tags/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Upload failed");
        }

        const data = await response.json();
        console.log("Upload successful:", data);

        setFiles([]);
    } catch (err) {
        console.error("Upload error:", err);
    }
};

return (
    <div className="h-50 w-50 border-2 border-whooshhgreen bg-white rounded-3xl">
        <div className="size-full flex justify-center text-center items-center" {...getRootProps()}>
            <input className="items-center" {...getInputProps()} />
            {isDragActive ? (
                <p className="font-mono text-l" > Drop files here</p>
            ) : (
                <p className="font-mono text-l">Drag and drop files here, or click to select Files</p>
            )}  
        </div>
        <ul className="text-center mt-5">
            {files.map(file => (
                <li key={file.name} className="flex justify-center w-50 ml-20">
                    {file.name}
                    <button
                    className="ml-30 text-red-600"
                    type="button"
                    onClick={() => removeFile(file.name)}
                    
                >
                    x
            </button>
                </li>
            ))}
            <li><button className="h-20 bg-whooshhgreen p-5 border-2 border-black rounded-2xl" type="button" onClick={handleSubmit}>Submit Files</button></li>
        </ul>
    </div>
    )
}
export default Dropzone;