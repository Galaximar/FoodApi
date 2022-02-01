import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { ascOrDsc, dietFilter, getAllFood } from "../redux/actions/actions";

export const Search = ()=>{
    const dispatch=useDispatch();
    const dietTypes=useSelector(state=>state.filterTypes.byDiet)
    const history=useNavigate();
    const orderAlphabetic=useSelector(state=>state.filterTypes.orderAlphabetic)
    const [inputValue, setInputValue] = useState("")
    const handleSubmit = async (e)=>{
        e.preventDefault();
        history(`?start=${0}&end=${9}`);
        await dispatch(getAllFood(inputValue));
        await dispatch(dietFilter(dietTypes))
        await dispatch(ascOrDsc(orderAlphabetic));
        setInputValue("");
    }
    const handleChange = (e)=>{
        setInputValue(e.target.value);
    }
    return (
        <div className="searchBar">
            <form onSubmit={handleSubmit}>
                <label>Search a Food </label>
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
