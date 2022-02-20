import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { validate } from "../functions/validate";
import { createRecipe, dietTypes, enlaceFoodWithDiet } from "../redux/actions/actions";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Review } from "./Review";

const data=["name","image","summary","points","healthScore"]

let initialStates={name:"",image:"",summary:"",points:"",healthScore:"",instructions:"",dietTypes:[]}

export const CreateRecipe=()=>{
    const dietData=useSelector(state=>state.dietTypes);
    const foodId=useSelector(state=>state.foodCreatedId)
    let [food,setFood]=useState({...initialStates});
    let [numberStep,setNumberStep]=useState(1);
    let [instructionsObject,setInstructionsObject]=useState([])
    let [errors, setErrors] = useState({...initialStates,existError:true});
    let [dietNames,setDietNames]=useState([]);
    const dispatch=useDispatch();
    const stepAgree=(e)=>{
        e.preventDefault()
        if(food.instructions){
            setInstructionsObject([...instructionsObject,{number:numberStep,step:food.instructions}])
            setNumberStep(++numberStep);
            food.instructions=""
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
            setDietNames([...dietNames,e.target.name])
            arr=[...food.dietTypes];
            arr.push(e.target.value)
        } else {
            setDietNames(dietNames.filter(d=>d!==e.target.name))
            arr=[...food.dietTypes].filter(d=>d!==e.target.value)
        }
        setFood({...food,dietTypes:arr});
    }
    setErrors(validate({
        ...food,
        [e.target.name]: e.target.value,instructionsObject,dietTypes:arr
    }));
    }

    const deleteStep=(e,i)=>{
        let deletedStep=instructionsObject.filter(s=>s.number!==i);
        for (let it=i-1;it<deletedStep.length;it++){
            if(deletedStep[it]) deletedStep[it].number-=1;
        }
        setInstructionsObject(deletedStep);
        setNumberStep(--numberStep);
    }

    let history=useNavigate();
    const errorSubmit=()=>{
        let err="";
        for (const key in errors) {
            if(key!=="existError"){
                if(typeof(errors[key])==="object"&&errors[key.length]) err+=", "+errors[key].join("");
                if(typeof(errors[key])==="string") err+=", "+errors[key]
            }
        }
        let messageError=" is required";
        if(!food.name) err+=", Name"+messageError
        if(!food.points) err+=", Points"+messageError
        if(!food.healthScore) err+=", Health Score"+messageError
        err=err.slice(2)
        
        swal({
            title:"Empty fields needed",
            text:err,
            icon:"info",
            
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(createRecipe({...food,instructions:[{steps:instructionsObject}]}))
        swal({
            title:"Recipe Create",
            text:"You want to create another recipe?",
            icon:"success",
            buttons:["No","Create Another"],
        }).then((r)=>{
            if(r) document.location.reload();
            else history("/food");
        })
    }

    useEffect(()=>{
        food.dietTypes.map((d)=>dispatch(enlaceFoodWithDiet(foodId,d)))
    },[dispatch,foodId])
    return (
        <div className="conteinerCreate formCreate1">
            <div className="createIzq">
            <h2 className="subtitle dataTitle">Information to create</h2>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div>
                        <div className="bg-form1">
                            {data.map((x,i)=>{
                                return (
                                    <div key={i} className="conteinerInputCreate1">
                                        <div className="inputCreate1">
                                            <label>{x[0].toUpperCase()+x.slice(1)}</label>
                                            <input className={`${typeof(errors[x])==='object'?(errors[x].length)&&"danger":errors[x]&&"danger"} inputCreate`} type="text" name={x} value={food[x]} onChange={handleInputChange}/>
                                        </div>
                                        <div className="error">
                                            {typeof(errors[x])==='object'?<span className={`${errors[x].length&&"danger"}`}>{errors[x].join(" and ")}</span>
                                            :<span className={`${errors[x]&&"danger"}`}>{errors[x]}</span>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>


                        <div className="dietBg">
                            <div className="dietTypesTitle">
                                <p>Select a Diet Types</p>
                                {errors.dietTypes?<span className="error danger"><p>{errors.dietTypes}</p></span>:null}
                            </div>
                            <div className="dietTypes">
                                {dietData.map(({dietType:d,id:i})=>{
                                        return (<label key={i}>
                                            {d[0].toUpperCase()+d.slice(1)}
                                            <input type="checkbox" name={d} value={i} onChange={(e)=>handleInputChange(e,"checkbox")}/>
                                            </label>)
                                    })}
                            </div>
                            <div className="submitRecipe">
                                {!errors.existError? <input value="Create recipe" className="submitRecipeButton" type="submit"/>:<label onClick={errorSubmit} className="noSubmitButton">Create Recipe</label>}
                            </div>
                        </div>



                    </div>
                    
                </form>
                <div className="stepBg">
                <div className="stepInput">
                <form autoComplete="off" onSubmit={stepAgree}>
                    <label className="titleFont">Steps  </label><br/>
                    {errors.instructions&&<span className="error danger"><p>{errors.instructions}</p></span>}<br/><input className="mediumFont inputStep" type="text" value={food.instructions} name="instructions" onChange={handleInputChange}/>
                    <input className="mediumFont addSteep" name="instructions" type="submit" value="Agree"/>
                </form>
                </div>

                <div>
                    {instructionsObject?.map(i=><p className="stepsAgree" key={i.number}><span className="numberStep">{i.number}</span>{i.step[0]?.toUpperCase()+i.step?.slice(1)}<span className="closeStep" onClick={(e)=>deleteStep(e,i.number)}>X</span></p>)}
                </div>
                <br/>
            </div>
            </div>

            
            <div className="imageLoad">
            <h2 className="subtitle previewTitle">Preview</h2>
                <Review 
                    name={food.name}
                    image={food.image}
                    summary={food.summary}
                    points={food.points}
                    healthScore={food.healthScore}
                    instructionsObject={instructionsObject}
                    dietNames={dietNames}
                    errors={errors}
                    option="divImg"
                />                    
            </div>

            
        </div>
    )
}