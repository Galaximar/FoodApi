import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getAllFood, loading } from "../redux/actions/actions";
import { Link } from 'react-router-dom';
import { Loading } from "./Loading";
import { ImageNotLoad } from "./ImageNotLoad";

export const CardFood=()=>{
    const dispatch= useDispatch();
    let foods= useSelector(state=>state.food);
    let start=useSelector(state=>state.start)
    let end=useSelector(state=>state.end);
    let [hover,setHover]=useState({action:"",id:-1});
    let [loading,setLoading]=useState(true);
    const mouseEnter=(e,f)=>{
        setHover({action:"enter",id:f.id});
    }
    const mouseLeave=()=>{
        setHover("leave")
    }
    useEffect(()=>{
        async function dispatchFood (){
            await dispatch(getAllFood());
            setLoading(false)
        }
        dispatchFood();
    },[dispatch])
    return (
        <>
                {
                loading||foods.length===0?<Loading />
                :foods[0]==="Not found"?
                <div>NOT FOUND</div>
                :<div className="images">
                {foods.slice(start,end)?.map(f=>{
                    return (
                    <div key={f.id} className="image" onMouseLeave={mouseLeave} onMouseEnter={(e)=>mouseEnter(e,f)}>
                        <div className="gridImgP">
                            {(hover.action==="enter"&&hover.id===f.id)?<div className="onHover">
                                <p>
                                    Diet Types: {f.diets.map(d=>d[0].toUpperCase()+d.slice(1)).join(", ")}<br/>
                                    Points:{f.points}<br/>
                                    HealthScore: <meter value={f.healthScore} min="0" low="30" high="70" max="100" optimum="20"> </meter> {f.healthScore}
                                </p>
                                <Link to={`info/${f.id}`}><button className="moreInfo">More Info</button></Link>
                            </div>:<div>
                                <ImageNotLoad f={f} option="divImgLoad"/>
                                <div>
                                    <p className="titleInfoCard divP">
                                        {f.name}
                                    </p>
                                </div>
                            </div>}
                        </div>    
                    </div>
                    )
                })}
                </div>
                }
        </>
    )
}