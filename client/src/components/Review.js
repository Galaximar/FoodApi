import React from "react";

export const Review=({name,image,summary,points,healthScore,instructionsObject,dietNames,errors})=>{
    return (
        <>
        <h2 className="subtitle previewTitle">Preview</h2>
            <div className="conteinerInfo">        
            <div>
                {name&&<h2 className="subtitle">{name}  </h2>}
                {image&&<img className="imgInfo" src={image} alt="imgRecipe"/>}
                <h2 className="subtitle">Summary</h2>
                {summary&&<p className="summary" dangerouslySetInnerHTML={{__html: summary}}></p>}
                <h2 className="subtitle">Diet Types</h2>
                <ul>
                    {dietNames.map((d,i)=><li key={i}>{d}</li>)}
                </ul>
            </div>

            <div>
            <h2 className="subtitle">Steps</h2>
            {instructionsObject.length?
                instructionsObject.map((s,i)=>{
                    return <div className="steps" key={i}><div>{s.number}</div> {s.step}</div>
                }):null
            }
                <h2 className="subtitle">Scores</h2>
                <div className="points">
                    <p>Healt Score <br/><br/> {(!errors.healthScore.length&&healthScore)&&healthScore}</p>
                    <p>Food Points <br/><br/> {(!errors.points.length&&points)&&points}</p>
                </div>
            </div>

            </div>
        </>
    )
}