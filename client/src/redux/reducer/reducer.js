import { DATA_FOOD_CREATED, DIET_FILTER, DIET_TYPES, FILTER_TYPES, FOOD_INFO, GET_ALL_FOOD, ORDERaz, ORDER_BY_POINTS } from "../actions/actions";
import { START } from "../actions/actions";
import { END } from "../actions/actions";

const initialState = {
    food: [],
    foodDetail:[],
    dietTypes:[],
    start:0,
    end:0,
    foodCreatedId:undefined,
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
        case FOOD_INFO:
            return {...state,foodDetail:action.payload}
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
        case ORDER_BY_POINTS:
            let {options}=action.payload; 
            let foodToOrder =[...state.food]
            if(options!==""){
                foodToOrder=foodToOrder.sort((a,b)=>{
                    if(option==="asc"){
                        if((a.spoonacularScore||a.points)>(b.spoonacularScore||b.points)) return 1 
                        if((a.spoonacularScore||a.points)<(b.spoonacularScore||b.points)) return -1
                        return 0;
                    } else {
                        if((a.spoonacularScore||a.points)>(b.spoonacularScore||b.points)) return -1
                        if((a.spoonacularScore||a.points)<(b.spoonacularScore||b.points)) return 1
                        return 0;
                    }
                })
            }
            return {...state,food:foodToOrder}
        case DIET_TYPES:
            let dietsData=action.payload;
            return {...state,dietTypes:dietsData}
        case DATA_FOOD_CREATED:
            return {...state,foodCreatedId:action.payload.id}
        case DIET_FILTER:
            let dietsReciveds=action.payload;  
            let foodDiet=foodOriginal
            if(dietsReciveds.length){
                let found=[];  
                foodDiet=foodOriginal?.filter((food)=>{ 
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
            } 
            return {...state,food:foodDiet}
        default:
            return state;
    };
};

export default reducer;
