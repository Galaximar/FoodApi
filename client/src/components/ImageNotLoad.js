import React, { useState } from "react";

export const ImageNotLoad=({f,name,image,option})=>{
    let [errorImg,setErrorImg]=useState({error:"",id:[]});
    const imgNotFound=(e,f)=>{
        let ant=[...errorImg.id]
        setErrorImg({error:"imgNotLoad",id:[...ant,f.id]});
    }
    return (
        <>
            <div className={option}>{(errorImg.error==="imgNotLoad"&&errorImg.id.find(x=>x===f.id))?<img src="https://cdn.dribbble.com/users/966009/screenshots/2630351/404-donut-dribble.jpg" alt="ImgNotFound"/>:<img onError={(e)=>imgNotFound(e,f)} src={f.image} alt={f.name}/>}</div>
        </>
    )
}