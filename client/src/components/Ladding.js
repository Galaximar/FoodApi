import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/resumen.jpg"
export const Ladding = ()=>{
    return (
        <div className="landdingContainer">
            <div className="landdingIzq">
                <div className="information">
                    <img src={logo} alt="img"/>
                    <p>
                        Food Api es una SPA (Simple Page Aplication), la cual
                        cree en el transcurso del bootcamp en Henry. En ella
                        se pueden crear recetas, buscar tipos de comida y filtrar
                        por tipos de dietas, puntajes y nivel saludable, además de
                        poder filtrar por elementos de la Api y la Base de Datos. También
                        se puede ver la información de cada receta, en la cual se encuentran
                        toda la información mencionada anteriormente más los pasos y un resumen
                        de la comida.
                        <br/>
                        <br/>
                        Mi nombre es Marcelo Gottardini, FullStack Web Developer,
                        manejo teconologías como: 
                    </p>
                </div>
            </div>
            <div className="landdingDer">
                <img src="https://www.hunanhousebargalt.com/images/loader.gif" alt="start"/>
                <Link to="/food">
                    Start
                </Link>
            </div>
        </div>
    )
}