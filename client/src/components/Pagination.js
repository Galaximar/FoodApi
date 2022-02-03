import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom";
import { startPagination } from "../redux/actions/actions";
import { endPagination } from "../redux/actions/actions";

const limit=9;
export const Pagination = ()=>{
    const foods=useSelector((state)=>state.food);
    const dispatch=useDispatch();
    const {search}=useLocation();
    const queryParam=new URLSearchParams(search);
    const start=parseInt(queryParam.get("start"))||0;
    const end=parseInt(queryParam.get("end"))||9;
    const history= useNavigate();
    useEffect(()=>{
        dispatch(startPagination(start));
        dispatch(endPagination(end));
    })

    let numbersPaginations=Math.ceil(foods.length/9)
    let arrNumbers=[]
    for(let i=0;i<numbersPaginations;i++){
        arrNumbers.push(i+1);
    }
    const handleClickButton= (e)=>{
        history(`?start=${(e.target.value-1)*9}&end=${(e.target.value-1)*9+limit}`)
    }
    const handleNext= (e)=>{
        if(foods.length>end)
        history(`?start=${start+limit}&end=${end+limit}`) 
    }
    const handlePrev= (e)=>{
        if(start>0){
            history(`?start=${start-limit}&end=${end-limit}`)
        }
    }
    return (
        <div className="next-prev">
            <span id="previous" className="spanButton" onClick={handlePrev}>Previous</span>
            {arrNumbers.map(n=>{
                return <button key={n} value={n} onClick={handleClickButton}>{n}</button>
            })}
            <span className="spanButton" onClick={handleNext}>Next</span>
        </div>
    )
}