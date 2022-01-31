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
                <p>{name}</p>
                <img src={image}/>
                <p className="summary" dangerouslySetInnerHTML={{__html: summary}}></p>
            </div>
            <div>
            {instructions?instructions[0].steps?.map((s,i)=>{
                    return <div className="steps" key={i}><div>{s.number}</div> {s.step}</div>
                }):null}
            </div>
        </div>
    )
}