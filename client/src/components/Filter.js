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
    }
    const handleChangeOrderByPoints= (e)=>{
        setValueOrderByPoints({orderPoints:e.target.value});
    }

    const handleChangeDiet= (e)=>{
        if(e.target.checked) setValueDiet([...valueDiet,e.target.value]) 
        else setValueDiet(valueDiet.filter(d=>d!==e.target.value))
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
            <SearchDataBase />
            <form >
                <select name="orderAlphabetic" onChange={handleChangeOrderByAbc}>
                    <option value="none">Order (a-z)</option>
                    <option value="asc">Ascendent</option>
                    <option value="dsc">Descendent</option>
                </select>
            </form>
            <form >
                <select name="orderPoints" onChange={handleChangeOrderByPoints}>
                    <option value="none">Order By Points</option>
                    <option value="ascPoints">Ascendent</option>
                    <option value="dscPoints">Descendent</option>
                </select>
            </form>

            <form> 
                <label>Diet Filter</label><br/>
                {dietData?.map(({dietType:d},i)=>{
                    return <label key={i} htmlFor={`cbox${i}`}><input type="checkbox"  value={d} id={`cbox${i}`} onChange={handleChangeDiet}/>{d[0].toUpperCase()+d.slice(1)}</label>
                })}
            </form>
        </div>
    )
}