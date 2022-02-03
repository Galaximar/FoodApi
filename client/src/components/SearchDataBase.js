import React, { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import { getAllFood } from "../redux/actions/actions";

export const SearchDataBase=()=>{
    const dispatch=useDispatch();
    const [value,setValue]=useState();
    const handleChange=(e)=>{
        setValue(e.target.value);
    }
    useEffect(()=>{
        if(value==="two") dispatch(getAllFood());
        else dispatch(getAllFood(0,value));
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