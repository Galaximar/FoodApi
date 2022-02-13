import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { ascOrDsc, ascOrDscByPoints, dietFilter, getAllFood } from "../redux/actions/actions";

export const SearchDataBase=()=>{
    const dispatch=useDispatch();
    const [value,setValue]=useState();
    const orderAlphabetic=useSelector(state=>state.filterTypes.orderAlphabetic);
    const orderPoints=useSelector(state=>state.filterTypes.orderByPoints);
    const dietTypes=useSelector(state=>state.filterTypes.byDiet);
    const handleChange=(e)=>{
        setValue(e.target.value);
    }
    useEffect(()=>{
        async function dispatchs(){
            if(value==="two") await dispatch(getAllFood());
            else await dispatch(getAllFood(0,value));
            await dispatch(dietFilter(dietTypes))
            await dispatch(ascOrDscByPoints({orderPoints}));
            await dispatch(ascOrDsc({orderAlphabetic}));
        }
        dispatchs();
    },[dispatch,value])
    return (
        <div >
            <form >
                <select name="databaseOrApi" onChange={handleChange}>
                    <option value="none">Database or Api</option>
                    <option value="searchDb">Database</option>
                    <option value="searchApi">Api</option>
                    <option value="two">Api and Db</option>
                </select>
            </form>
        </div>
    )
}