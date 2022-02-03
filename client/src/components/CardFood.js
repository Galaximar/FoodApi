import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getAllFood, loading } from "../redux/actions/actions";
import { Link } from 'react-router-dom';


export const CardFood=()=>{
    const dispatch= useDispatch();
    let foods= useSelector(state=>state.food);
    let start=useSelector(state=>state.start)
    let end=useSelector(state=>state.end);
    useEffect(()=>{
        dispatch(getAllFood());
    },[dispatch])
    useEffect(()=>{
        return ()=>{
            dispatch(loading(["Loading"]))
        };
    },[dispatch])
    return (
        <div className="images">
            {foods[0]==="Loading"?<div className="plusCard">
                <h2 className="largeFont">Wait a few seconds</h2>
                <img src="https://qitian.be/wp-content/uploads/2019/10/spinner-loading.gif" alt="loading..."/>
            </div>:
            foods[0]==="Not found"?
            <div className="plusCard">
                <div>
                    <h2 className="largeFont">
                        Recipe not found.
                    </h2>
                    <img src="https://www.moes.com/assets/moes/img/testing/404/CryingChip404.gif" alt="imgNotFound"/>
                </div>
            </div>:foods.slice(start,end)?.map(f=>{
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
            })
            }
        </div>
    )
}