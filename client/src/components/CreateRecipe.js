import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { validate } from "../functions/validate";
import { createRecipe, enlaceFoodWithDiet } from "../redux/actions/actions";

const data=["name","image","summary","points","healthScore"]

let initialStates={name:"",image:"",summary:"",points:"",healthScore:"",instructions:"",dietTypes:[]}

export const CreateRecipe=()=>{
    const dietData=useSelector(state=>state.dietTypes);
    const foodId=useSelector(state=>state.foodCreatedId)
    let [food,setFood]=useState({...initialStates});
    let [numberStep,setNumberStep]=useState(1);
    let [instructionsObject,setInstructionsObject]=useState([])
    let [errors, setErrors] = useState({...initialStates,existError:true});
    const dispatch=useDispatch();
    const stepAgree=(e)=>{
        e.preventDefault()
        if(food.instructions){
            setInstructionsObject([...instructionsObject,{number:numberStep,step:food.instructions}])
            setNumberStep(++numberStep);
        }
    }
    useEffect(()=>{
        setErrors(validate({...food,instructionsObject}));
    },[instructionsObject])

    const handleInputChange = function(e,option){
    let arr=[...food.dietTypes];
    if(option!=="checkbox") {
        setFood({...food,[e.target.name]:e.target.value})
    }
    else {
        if(e.target.checked){
            arr=[...food.dietTypes];
            arr.push(e.target.value)
        } else {
            arr=[...food.dietTypes].filter(d=>d!==e.target.value)
        }
        setFood({...food,dietTypes:arr});
    }
    setErrors(validate({
        ...food,
        [e.target.name]: e.target.value,instructionsObject,dietTypes:arr
    }));
    }


    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(createRecipe({...food,instructions:[{steps:instructionsObject}]}))
    }

    useEffect(()=>{
        food.dietTypes.map((d)=>dispatch(enlaceFoodWithDiet(foodId,d)))
    },[dispatch,foodId])
    return (
        <div className="conteinerCreate">
            <div>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="formCreate1">
                        {data.map((x,i)=>{
                            return (
                                <div key={i} className="conteinerInputCreate1">
                                    <div className="inputCreate">
                                        <label>{x[0].toUpperCase()+x.slice(1)}</label> 
                                        <input className={typeof(errors[x])==='object'?(errors[x].length)&&"danger":errors[x]&&"danger"} type="text" name={x} value={food[x]} onChange={handleInputChange}/>
                                    </div>
                                    <div className="error">
                                        {typeof(errors[x])==='object'?<span className="danger">{errors[x].join(" and ")}</span>
                                        :<span className="danger">{errors[x]}</span>}
                                    </div>
                                </div>
                            )
                        })}
                        <div className="imageLoad">
                            {food.image?<img className="img" alt="imgNotLoad" src={food.image}/>:null}
                        </div>
                    </div>
                    <p className="dietTypesTitle">Select a Diet Types</p>
                    <div className="dietTypes">
                    {errors.dietTypes?<span className="danger">{errors.dietTypes}</span>:null}
                    {dietData.map(({dietType:d,id:i})=>{
                            return (<label key={i}>
                                {d[0].toUpperCase()+d.slice(1)}
                                <input type="checkbox" name={d} value={i} onChange={(e)=>handleInputChange(e,"checkbox")}/>
                                </label>)
                        })}
                    </div>
                    <div className="submitRecipe">
                    {!errors.existError? <input className="submitRecipeButton" type="submit"/>:null}
                    </div>
                    
                </form>
            </div>

            <div className="stepInput">
                <form autoComplete="off" onSubmit={stepAgree}>
                    <label className="titleFont">Steps  </label><br/><br/>
                    {errors.instructions&&<span className="danger">{errors.instructions}</span>}<br/><input className="mediumFont" type="text" value={food.instructions} name="instructions" onChange={handleInputChange}/>
                    <input className="mediumFont" name="instructions" type="submit" value="Agree"/>
                </form>
            </div>

            <div>
                {instructionsObject?.map(i=><p className="stepsAgree" key={i.number}><span className="numberStep">{i.number}</span> {i.step[0]?.toUpperCase()+i.step?.slice(1)}</p>)}
            </div>
            <br/>
        </div>
    )
}