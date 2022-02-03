import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { foodInfo } from "../redux/actions/actions";
import { useParams } from 'react-router-dom';
import { removeUltimateLines } from "../functions/removeUltimateLines";

export const CardInfo=()=>{
    const dispatch=useDispatch();
    let foodDetail=useSelector(({foodDetail})=>foodDetail);
    let {name,image,summary,points,healthScore,instructions}=foodDetail
    summary=removeUltimateLines(summary);
    let {id}=useParams();
    useEffect(()=>{
        dispatch(foodInfo(id));
    },[dispatch,id])
    return (
        <div className="conteinerInfo">
            <div>
                <h2 className="subtitle">{name}  </h2>
                <img className="imgInfo" src={image} alt="imgRecipe"/>
                <h2 className="subtitle">Summary</h2>
                <p className="summary" dangerouslySetInnerHTML={{__html: summary}}></p>
            </div>
            <div>
            <h2 className="subtitle">Steps</h2>
            {instructions?instructions[0]?.steps.map((s,i)=>{
                    return <div className="steps" key={i}><div>{s.number}</div> {s.step}</div>
                }):null}
                <h2 className="subtitle">Scores</h2>
                <div className="points">
                    <p >Health Score <br/><br/>{healthScore}</p>
                    <p>Food Points <br/><br/>{points}</p>
                </div>
            </div>
        </div>
    )
}