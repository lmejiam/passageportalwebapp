import React from "react";
import Header from "../components/Header";
import UploadedImages from "../components/Uploadedimages";

const Images = ()=>{

    return(
        <div className="w-full min-w-page h-screen">
            <div className="pl-12 pr-12">
                <Header></Header>
            </div>
            <div className="mx-12 mt-5 px-12">
                <UploadedImages></UploadedImages>
            </div>
        </div>
    )
}
export default Images;
