import React from "react";
import { ImageNotLoad } from "./ImageNotLoad";

export const Review=({name,image,summary,points,healthScore,instructionsObject,dietNames,errors,option})=>{
    if(summary) summary=summary[0]?.toUpperCase()+summary?.slice(1);
    if(!name) name=" "
    return (
        <>
            <div className="conteinerInfo">        
            <div className="fatherizq">
                {name&&!errors.name&&<h2 className="subtitle">{name[0]?.toUpperCase()+name.slice(1)}  </h2>}
                {image&&<ImageNotLoad option={option} f={{name,image,id:1}}/>}
                <h2 className="subtitle">Summary</h2>
                {summary&&<p className="summary" dangerouslySetInnerHTML={{__html: summary}}></p>}
                <h2 className="subtitle">Diet Types</h2>
                <ul>
                    {dietNames?.map((d,i)=><li key={i}>{d[0]?.toUpperCase()+d.slice(1)}</li>)}
                </ul>
            </div>
            <div>
            <h2 className="subtitle">Steps</h2>
            {instructionsObject?.length?
                instructionsObject?.map((s,i)=>{
                    return <div className="steps" key={i}><span>{s.number}</span> {s.step[0]?.toUpperCase()+s.step.slice(1)} <br/><br/></div>
                }):null
            }
                <h2 className="subtitle">Scores</h2>
                <div className="points">
                    <p className="scoreTitle">Healt Score <br/><br/> <span className="healthScore">{(!errors.healthScore.length&&healthScore)&&`${healthScore} ❤`}</span></p>
                    <p className="scoreTitle">Food Points <br/><br/> <span className="pointsScore">{(!errors.points.length&&points)&&`${points} ⭐`}</span></p>
                </div>
            </div>

            </div>
        </>
    )
}