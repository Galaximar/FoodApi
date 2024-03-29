import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { ascOrDsc, ascOrDscByPoints, dietFilter, getAllFood } from "../redux/actions/actions";

export const Search = ()=>{
    const dispatch=useDispatch();
    const dietTypes=useSelector(state=>state.filterTypes.byDiet);
    const history=useNavigate();
    const orderAlphabetic=useSelector(state=>state.filterTypes.orderAlphabetic);
    const orderPoints=useSelector(state=>state.filterTypes.orderByPoints);
    const [inputValue, setInputValue] = useState("")
    useEffect(()=>{
        return ()=>setInputValue("")
    },[])
    const handleSubmit = async (e)=>{
        e.preventDefault();
        history(`?start=${0}&end=${9}`);
        await dispatch(getAllFood(inputValue));
        await dispatch(dietFilter(dietTypes))
        await dispatch(ascOrDscByPoints({orderPoints}));
        await dispatch(ascOrDsc({orderAlphabetic}));
        setInputValue("");
    }
    const handleChange = (e)=>{
        setInputValue(e.target.value);
    }
    return (
        <div className="searchBar">
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Write a food. . ."
                value={inputValue}
                onChange={handleChange}
                />
            </form>
        </div>
    )
}
