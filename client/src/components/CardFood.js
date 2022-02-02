import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getAllFood } from "../redux/actions/actions";
import { Link } from 'react-router-dom';


export const CardFood=()=>{
    const dispatch= useDispatch();
    const foods= useSelector(state=>state.food);
    const start=useSelector(state=>state.start)
    const end=useSelector(state=>state.end);
    useEffect(()=>{
        dispatch(getAllFood());
    },[dispatch])
    return (
        <div className="images">
            {foods.slice(start,end)?.map(f=>{
                return (
                <div key={f.id} className="image">
                    <Link to={`info/${f.id}`}>
                        <p className="titleInfoCard">
                            {f.name}<br/>
                            {f.points} Diet Types: {f.diets.map(d=>d[0].toUpperCase()+d.slice(1)).join(", ")}
                        </p>
                        <img src={f.image} alt={f.name}/>
                    </Link>    
                </div>
                )
            })}
        </div>
    )
}