import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { SearchDataBase } from "./SearchDataBase"
import { Search } from "./Search"
import {ascOrDsc, ascOrDscByPoints, changeFilterTypes, dietFilter } from "../redux/actions/actions";

export const Filter = ()=>{
    const dietData=useSelector(state=>state.dietTypes);
    const [valueOrderByAbc,setValueOrderByAbc]=useState({orderAlphabetic:"none"});
    const [valueOrderByPoints,setValueOrderByPoints]=useState({orderPoints:"none"});
    const [valueDiet,setValueDiet]=useState([]);

    const dispatch=useDispatch();

    const handleChangeOrderByAbc= (e)=>{
        setValueOrderByAbc({orderAlphabetic:e.target.value});
        document.getElementById("orderPoints").reset();
        window.scrollTo({top:0,left:0,behavior: 'smooth'});
    }
    const handleChangeOrderByPoints= (e)=>{
        setValueOrderByPoints({orderPoints:e.target.value});
        document.getElementById("orderAlphabetic").reset();
        window.scrollTo({top:0,left:0,behavior: 'smooth'});
    }

    const handleAgreeDiet=(e)=>{
        let exist=valueDiet.find((d)=>d===e.target.value)
        if(e.target.value!=="diets"&&!exist)
        setValueDiet([...valueDiet,e.target.value]);
        document.getElementById("dietForm").reset()
        window.scrollTo({top:0,left:0,behavior: 'smooth'});
    }
    const suprOptionDiet=(e)=>{
        setValueDiet([...valueDiet.filter((d)=>d!==e.target.value)]);
        window.scrollTo({top:0,left:0,behavior: 'smooth'});
    }

    useEffect(()=>{
        dispatch(dietFilter(valueDiet));
        dispatch(changeFilterTypes(valueDiet));
    },[valueDiet,dispatch])

    useEffect(()=>{
        dispatch(ascOrDsc(valueOrderByAbc));
        dispatch(changeFilterTypes(valueOrderByAbc));
    },[valueOrderByAbc,dispatch])

    useEffect(()=>{
        dispatch(ascOrDscByPoints(valueOrderByPoints));
        dispatch(changeFilterTypes(valueOrderByPoints));
    },[valueOrderByPoints,dispatch])


    return (
        <div className="filter">
            <Search />
            <label>Search by Db or Api</label>
            <SearchDataBase />
            <label>Order Alphabetic</label>
            <form id="orderAlphabetic">
                <select name="orderAlphabetic" onChange={handleChangeOrderByAbc}>
                    <option value="none">Order (a-z)</option>
                    <option value="asc">Ascendent</option>
                    <option value="dsc">Descendent</option>
                </select>
            </form>
            <label>Order by Points</label>
            <form id="orderPoints">
                <select name="orderPoints" onChange={handleChangeOrderByPoints}>
                    <option value="none">Order By Points</option>
                    <option value="ascPoints">Ascendent</option>
                    <option value="dscPoints">Descendent</option>
                </select>
            </form>

            <label>Filter by Diet Types</label>

            <form id="dietForm">
                <select name="dietFilter" onChange={handleAgreeDiet}>
                    <option value="diets">Diets</option>
                {dietData?.map(({dietType:d},i)=>{
                    return <option key={i} value={d}>{d[0].toUpperCase()+d.slice(1)}</option>
                })}
                </select>
            </form>

            <div className="dietSelectedContainer">
                {valueDiet.map((d,i)=>{
                    return (
                        <div key={i} className="dietSelectedStyle">
                            <button value={d} className="dietSelectedButton" onClick={suprOptionDiet}>X</button>
                            <label className="dietSelected">{d[0].toUpperCase()+d.slice(1)}</label>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}