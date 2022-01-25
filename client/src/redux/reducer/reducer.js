import { DIET_FILTER, DIET_TYPES, FILTER_TYPES, GET_ALL_FOOD, ORDERaz } from "../actions/actions";
import { START } from "../actions/actions";
import { END } from "../actions/actions";

const initialState = {
    food: [],
    dietTypes:[],
    start:0,
    end:0,
    filterTypes:{
        orderAlphabetic: "",
        byDiet: [],
    }
};
let foodOriginal=[]

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_FOOD:
            foodOriginal=action.payload;
            return {...state,food:action.payload}
        case START:
            return {...state,start:action.payload}
        case END:
            return {...state,end:action.payload}
        case FILTER_TYPES:
            if(Array.isArray(action.payload)) return {...state,...state.filterTypes.byDiet=action.payload}
            else return {...state,...state.filterTypes.orderAlphabetic=action.payload}
        case ORDERaz:
            let {option}=action.payload; 
            let foodOrder =[...state.food]
            if(option!==""){
                foodOrder=foodOrder.sort((a,b)=>{
                    if(option==="asc"){
                        if(a.name>b.name) return 1 //a es el de la derecha
                        if(a.name<b.name) return -1
                        return 0;
                    } else {
                        if(a.name>b.name) return -1
                        if(a.name<b.name) return 1
                        return 0;
                    }
                })
            }
            return {...state,food:foodOrder}
        case DIET_TYPES:
            let diets=action.payload;
            let dietsArray=[];
            for (const key in diets) {
                dietsArray.push(diets[key]);
            }
            return {...state,dietTypes:dietsArray}
        case DIET_FILTER:
            let dietsReciveds=action.payload;  
            if(dietsReciveds){
                let found=[];  
                let foodDiet=foodOriginal?.filter((food)=>{ 
                return food.diets.some((f,i)=>{
                    let options=dietsReciveds.find((options)=>options===f)
                    if(options) {
                        found.push(options)
                    }
                    if(found.length===dietsReciveds.length) {
                        found=[];
                        return true
                    }
                    if(i+1===food.diets.length) {
                        found=[]
                    }
                    return false;
                })
            })
            return {...state,food:foodDiet}
            } else {
                return {...state}
            }
        default:
            return state;
    };
};

export default reducer;
