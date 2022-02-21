import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { deleteRecipeFetch, getAllFood, loading } from "../redux/actions/actions";
import { Link } from 'react-router-dom';
import { Loading } from "./Loading";
import { ImageNotLoad } from "./ImageNotLoad";
import { UpdateRecipe } from "./UpdateRecipe";
import { FoodNotFound } from "./FoodNotFound";

export const CardFood=()=>{
    const dispatch= useDispatch();
    let foods= useSelector(state=>state.food);
    let start=useSelector(state=>state.start)
    let end=useSelector(state=>state.end);
    let [hover,setHover]=useState({action:"",id:-1});
    let [loading,setLoading]=useState(true);
    const dietData=useSelector(state=>state.dietTypes);
    let [update,setUpdate]=useState({});
    const updateButton=(e,f)=>{
        let arrDietTypes=[];
        f.diets.forEach(d=>{
            dietData.forEach(x=>{
                if(d===x.dietType) arrDietTypes.push(x.id)
            })
        })
        setUpdate({
            option:"yes",name:f.name,summary:f.summary,image:f.image,points:f.points,healthScore:f.healthScore,
            instructions:f.instructions[0].steps,diets:[...f.diets],id:f.id,dietTypes:[...arrDietTypes]
            
        })
    }
    const deleteRecipe=(e,f)=>{
        dispatch(deleteRecipeFetch(f.id));
    }
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
                {update.option==="yes"?
                <UpdateRecipe  
                name={update.name}
                image={update.image}
                summary={update.summary}
                diets={update.diets}
                points={update.points}
                healthScore={update.healthScore}
                instructionsArr={update.instructions}
                id={update.id}
                dietTypes={update.dietTypes}
                />
                :loading||foods.length===0?<Loading />
                :foods[0]==="Not found"?
                <FoodNotFound />
                :<div className="images">
                {foods.slice(start,end)?.map(f=>{
                    return (
                    <div key={f.id} className="image" onMouseLeave={mouseLeave} onMouseEnter={(e)=>mouseEnter(e,f)}>
                        <div className={`${/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(f.id)&&"isDb"} gridImgP`}>
                            {(hover.action==="enter"&&hover.id===f.id)?<div className="onHover">
                                <p>
                                    Diet Types: {f.diets.map(d=>d[0].toUpperCase()+d.slice(1)).join(", ")}<br/>
                                    Points:{f.points}<br/>
                                    HealthScore: <meter value={f.healthScore} min="0" low="30" high="70" max="100" optimum="20"> </meter> {f.healthScore}
                                </p>
                                <Link to={`info/${f.id}`}><button className="moreInfo">More Info</button></Link>
                                {!(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(f.id))?<span className="noRecBut">It's not your recipe</span>:null}
                                {/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(f.id)?<button onClick={(e)=>updateButton(e,f)} className="editBut">Edit</button>:null}
                                {/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(f.id)?<button onClick={(e)=>deleteRecipe(e,f)} className="deleteBut">Delete</button>:null}
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