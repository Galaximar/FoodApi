import React from "react";
import { Link } from "react-router-dom";
export const Ladding = ()=>{
    return (
        <div className="contenedorInicial">
            <img src="https://reygif.com/media/5/comer-tallarines-con-palillos-62825.gif" alt="start"/>
            <Link to="/food">
                Start
            </Link>
        </div>
    )
}