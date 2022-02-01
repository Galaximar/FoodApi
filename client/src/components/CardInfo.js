import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { foodInfo } from "../redux/actions/actions";
import { useParams } from 'react-router-dom';


export const CardInfo=()=>{
    const dispatch=useDispatch();
    let foodDetail=useSelector(({foodDetail})=>foodDetail);
    let {name,image,summary,points,healthScore,instructions}=foodDetail
    let {id}=useParams();
    useEffect(()=>{
        dispatch(foodInfo(id));
    },[dispatch,id])
    return (
        <div className="conteinerInfo">
            <div>
                <h2 className="subtitle">{name}  </h2>
                <img className="imgInfo" src={image}/>
                <h2 className="subtitle">Summary</h2>
                <p className="summary" dangerouslySetInnerHTML={{__html: summary}}></p>
            </div>
            <div>
            <h2 className="subtitle">Steps</h2>
            {instructions?instructions[0].steps?.map((s,i)=>{
                    return <div className="steps" key={i}><div>{s.number}</div> {s.step}</div>
                }):null}
            </div>
        </div>
    )
}