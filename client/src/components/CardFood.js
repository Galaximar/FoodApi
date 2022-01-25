import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getAllFood } from "../redux/actions/actions";


export const CardFood=()=>{
    const dispatch= useDispatch();
    const foods= useSelector(state=>state.food);
    const start=useSelector(state=>state.start)
    const end=useSelector(state=>state.end)
    useEffect(()=>{
        dispatch(getAllFood());
    },[dispatch])
    return (
        <div className="images">
            {foods.slice(start,end)?.map(f=>{
                return (
                <div key={f.id} className="image">
                    <p>{f.diets.join(" ")} {f.name}</p>
                    <img src={f.image} alt={f.name}/>
                </div>
                )
            })}
        </div>
    )
}