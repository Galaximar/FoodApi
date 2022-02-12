import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getAllFood, loading } from "../redux/actions/actions";
import { Link } from 'react-router-dom';
import { Loading } from "./Loading";


export const CardFood=()=>{
    const dispatch= useDispatch();
    let foods= useSelector(state=>state.food);
    let start=useSelector(state=>state.start)
    let end=useSelector(state=>state.end);
    let [hover,setHover]=useState({action:"",id:-1});
    let [errorImg,setErrorImg]=useState({error:"",id:[]});
    const imgNotFound=(e,f)=>{
        let ant=[...errorImg.id]
        setErrorImg({error:"imgNotLoad",id:[...ant,f.id]});
    }
    const mouseEnter=(e,f)=>{
        setHover({action:"enter",id:f.id});
    }
    const mouseLeave=()=>{
        setHover("leave")
    }
    useEffect(()=>{
        dispatch(getAllFood());
    },[dispatch])
    useEffect(()=>{
        return ()=>{
            dispatch(loading(["Loading"]))
        };
    },[dispatch])
    console.log(foods)
    return (
        <>
                {foods[0]==="Loading"||foods.length===0?<Loading />:
                foods[0]==="Not found"?
                <div className="plusCard">
                    <div>
                        <h2 className="largeFont">
                            Recipe not found.
                        </h2>
                        <img src="https://www.moes.com/assets/moes/img/testing/404/CryingChip404.gif" alt="imgNotFound"/>
                    </div>
                </div>
                :
                <div className="images">
                {foods.slice(start,end)?.map(f=>{
                    return (
                    <div key={f.id} className="image" onMouseLeave={mouseLeave} onMouseEnter={(e)=>mouseEnter(e,f)}>
                        <div className="gridImgP">
                            {(hover.action==="enter"&&hover.id===f.id)?<div className="onHover">
                                <p>
                                    Diet Types: {f.diets.map(d=>d[0].toUpperCase()+d.slice(1)).join(", ")}<br/>
                                    HealthScore: <meter value={f.healthScore} min="0" low="30" high="70" max="100" optimum="20"> </meter> {f.healthScore}<br/>
                                    Points:{f.points}
                                </p>
                                <Link to={`info/${f.id}`}><button className="moreInfo">More Info</button></Link>
                            </div>:<div>
                                <div className="divImg">{(errorImg.error==="imgNotLoad"&&errorImg.id.find(x=>x===f.id))?<img src="https://cdn.dribbble.com/users/966009/screenshots/2630351/404-donut-dribble.jpg" alt="ImgNotFound"/>:<img onError={(e)=>imgNotFound(e,f)} src={f.image} alt={f.name}/>}</div>
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