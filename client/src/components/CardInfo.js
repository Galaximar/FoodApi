import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { foodInfo } from "../redux/actions/actions";
import { useParams } from 'react-router-dom';
import { removeUltimateLines } from "../functions/removeUltimateLines";
import { Loading } from "./Loading";
import { Review } from "./Review";

export const CardInfo=()=>{
    const dispatch=useDispatch();
    let foodDetail=useSelector(({foodDetail})=>foodDetail);
    let [loading,setLoading]=useState(true);
    let {name,image,summary,points,healthScore,instructions,diets}=foodDetail
    summary=removeUltimateLines(summary);
    let {id}=useParams();
    useEffect(async ()=>{
        await dispatch(foodInfo(id));
        setLoading(false)
    },[dispatch,id])
    
    return (
        <>
        {loading?<Loading />:
            <Review name={name}
            image={image}
            summary={summary}
            points={points}
            healthScore={healthScore}
            instructionsObject={instructions[0].steps}
            errors={{healthScore:[],points:[]}}
            dietNames={diets}
            option="divImg"
            />
        }
        </>
    )
}